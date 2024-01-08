import { css } from '@emotion/react';
import { TocContent, TocElementUtil } from 'common/TocElementUtil';

const styleRoot = css`
  margin-bottom: 48px !important;
`;

const styleContentsWrapper = css`
  margin-top: 0px;
  list-style-type: none;
`;

const styleContentIndent = (indent: number) => [
  css`
    padding-left: ${(indent + 1) * 20}px;
    font-weight: ${indent == 0 ? 'bold' : 'normal'};
    padding-top: ${indent == 0 ? 12 : 0}px;
  `,
];

/**
 * 目次コンポーネント
 * @param props
 * @returns
 */
const TocContentItem = (props: { tocContents: TocContent[] }) => {
  const tocContents = props.tocContents;

  // 目次要素がなければ表示しない
  if (!tocContents || tocContents.length <= 0) {
    return <></>;
  }

  // 目次要素に必要な情報を取得してElementに変換
  const tocElementInfoArray =
    TocElementUtil.getTocElementInfoArray(tocContents);
  const tocElements = tocElementInfoArray.map((tocElementInfo, index) => {
    const tocContent = tocContents[index];
    return (
      <li css={styleContentIndent(tocElementInfo.indent)} key={tocContent.id}>
        <a
          href={`#${tocContent.id}`}
        >{`${tocElementInfo.prefixNo}. ${tocContent.title}`}</a>
      </li>
    );
  });

  return (
    <div className="toc toc-center" css={styleRoot}>
      <label className="toc-title">目次</label>
      <div className="toc-content">
        <ol css={styleContentsWrapper}>{tocElements}</ol>
      </div>
    </div>
  );
};
export default TocContentItem;
