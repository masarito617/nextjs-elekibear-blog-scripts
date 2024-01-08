import { css, Theme } from '@emotion/react';
import { useEffect, useState } from 'react';
import SideWidgetBase from '../WidgetBase';
import { TocContent, TocElementUtil } from 'common/TocElementUtil';
import SiteSettings from 'settings/SiteSettings';
import { lg } from 'style/media';

const styleScrollWidget = css`
  top: 16px !important;
  position: sticky !important;
  // サイドバーがない場合には不要なので非表示にする
  ${lg(css`
    display: none;
  `)}
`;

const styleContentsWrapper = (theme: Theme) => css`
  margin-top: 0px;
  padding: 8px 12px 24px 8px;
  color: ${theme.colors.primaryLightGray};
  font-size: 14px;
  list-style-type: none;
`;

const styleContentIndent = (indent: number) => [
  css`
    padding-left: ${(indent + 1) * 20}px;
    font-weight: ${indent == 0 ? 'bold' : 'normal'};
    padding-top: ${indent == 0 ? 12 : 0}px;
  `,
];

const styleContentLink = (theme: Theme) => css`
  color: ${theme.colors.primaryDarkGray};
  text-decoration: none;
  text-decoration-line: none;
`;

const styleContentLinkHighLight = (theme: Theme) => css`
  ${styleContentLink(theme)}
  background-color: ${theme.colors.primaryYellow};
`;

/**
 * 目次ウィジェット
 * 投稿ページでのみ表示する
 * @returns
 */
const TocWidget = (props: { tocContents: TocContent[] }) => {
  const tocContents = props.tocContents;

  // ハイライトさせるインデックスNo (-1: ハイライト無し)
  const [currentHighlightIndex, SetHighlightIndex] = useState<number>(-1);

  // スクロールに応じて目次をハイライトさせる処理
  // https://tekrog.com/following-side-index#i-2
  useEffect(() => {
    if (!tocContents || tocContents.length <= 0) {
      return;
    }

    // スクロール検知
    const offset = 100; // 反応を早めるため若干ずらす
    const checkScrollHighlight = () => {
      // 各見出しの位置を取得する
      const headingContents: NodeListOf<Element> = document.querySelectorAll(
        SiteSettings.TocHeadTags,
      );
      const headingPosArray: number[] = [...headingContents].map((element) =>
        Math.floor(element.getBoundingClientRect().top + window.scrollY),
      );

      const currentPos = window.scrollY;
      const headingNum = tocContents.length;
      let highLightIndex = -1;
      for (let i = 0; i < headingNum; i++) {
        // 見出しの間に入っている時、ハイライト対象とする
        if (
          i < headingNum - 1 &&
          currentPos + offset >= headingPosArray[i] &&
          currentPos + offset < headingPosArray[i + 1]
        ) {
          highLightIndex = i;
          break;
        } else if (
          i == headingNum - 1 &&
          currentPos + offset >= headingPosArray[i]
        ) {
          highLightIndex = i;
          break;
        }
      }
      SetHighlightIndex(highLightIndex);
    };

    // スクロールイベントに登録
    window.addEventListener('scroll', checkScrollHighlight);
    return () => window.removeEventListener('scroll', checkScrollHighlight);
  }, [tocContents]);

  // 目次要素がなければ表示しない
  if (!tocContents || tocContents.length <= 0) {
    return <></>;
  }

  // 目次要素に必要な情報を取得してElementに変換
  const tocElementInfoArray =
    TocElementUtil.getTocElementInfoArray(tocContents);
  const tocElements = tocElementInfoArray.map((tocElementInfo, index) => {
    const tocContent = tocContents[index];
    const isHighlight = currentHighlightIndex == index;
    return (
      <li css={styleContentIndent(tocElementInfo.indent)} key={tocContent.id}>
        <a
          css={isHighlight ? styleContentLinkHighLight : styleContentLink}
          href={`#${tocContent.id}`}
        >{`${tocElementInfo.prefixNo}. ${tocContent.title}`}</a>
      </li>
    );
  });

  // タグに応じてインデントを付与して描画
  return (
    <SideWidgetBase title="目次" addCss={styleScrollWidget}>
      <ol css={styleContentsWrapper}>{tocElements}</ol>
    </SideWidgetBase>
  );
};
export default TocWidget;
