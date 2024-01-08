import * as cheerio from 'cheerio';
import { TocContent } from 'common/TocElementUtil';
import SiteSettings from 'settings/SiteSettings';

/**
 * HTMLテキスト用 記事コンテンツ
 * @param props
 * @returns
 */
const HtmlTextPostContent = (props: {
  postContent: string;
  pushPostTocContent: (tocContent: TocContent) => void;
}) => {
  // react-html-parser等でReactElementに変換すると
  // Prism等の外部スクリプトによる変更でDOMエラーが発生してしまう (removeChild...)
  // そのため、cheerioでHTML文字列のまま編集し、dangeraouslySetInnerHTMLに設定する方針とした.
  const $ = cheerio.load(decodeURI(props.postContent));

  // 目次要素の抽出
  $(SiteSettings.TocHeadTags).each((index, elem) => {
    const spanElem = $(elem).find('span');
    if (!spanElem || !spanElem[0]) {
      return;
    }
    const id = spanElem[0].attribs.id;
    const title = spanElem.html() ?? '';
    const tag = $(elem)[0].name;
    props.pushPostTocContent({
      id: id,
      title: title,
      tag: tag,
    });
  });

  // 画像をポップアップ表示できるようにする (CSSのみで実装)
  // https://www.rectus.co.jp/archives/4247
  $('img').each((index, elem: any) => {
    if (
      elem.parent.name === 'figure' &&
      elem.parent.attribs.class.indexOf('wp-block-image') >= 0 &&
      elem.parent.attribs.class.indexOf('ramen') < 0 &&
      !(elem.parent.parent?.name === 'a')
    ) {
      // indexからidを生成
      const popupImageId = `popup-img-${index}`;
      const popupCheckboxId = `popup-checkbox-${index}`;

      // 画像クリックでcheckboxをONにする
      $(elem).wrap(`<label for="${popupCheckboxId}"></label>`);

      // 画像ポップアップ部分
      // 背景マスククリックで閉じる、ポップアップ画像クリックで別タブで開く
      const src = elem.attribs?.src;
      $(elem.parent.parent).append(
        `
          <input id="${popupCheckboxId}" type="checkbox">
          <label id="${popupImageId}" class="popup-image-wrapper" for="${popupCheckboxId}">
            <img src="${src}" class="popup-image">
          </label>

          <style type="text/css" media="screen">
          #${popupImageId} {
            display: none;
          }
          #${popupCheckboxId} {
            display: none;
          }
          #${popupCheckboxId}:checked + #${popupImageId} {
            display: flex !important;
          }
          </style>
          `,
      );
    }
  });

  return (
    <div
      className="entry-content"
      dangerouslySetInnerHTML={{ __html: $.html() }}
    />
  );
};
export default HtmlTextPostContent;
