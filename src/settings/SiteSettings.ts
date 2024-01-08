/**
 * サイト全体の設定 (ダミーデータ)
 */
namespace SiteSettings {
  /**
   * サイトのドメイン名
   */
  export const SiteDomainName = 'localhost';

  /**
   * URLクエリパラメータ名
   */
  export const UrlParamNamePage = 'page';
  export const UrlParamNameSearch = 'search';
  export const UrlParamNameCateogry = 'category';
  export const UrlParamNameTag = 'tag';

  /**
   * 各データのファイルパス
   */
  export const HTML_TEXT_POSTS_PATH: string = 'data-dummy/posts';
  export const MARKDOWN_POSTS_PATH: string = 'data-dummy/posts-md';
  export const MARKDOWN_POSTS_PREVIEW_PATH: string =
    'data-dummy/posts-md/preview';
  export const MST_DATA_PATH: string = 'data-dummy/db';

  /**
   * メニューに表示するカテゴリ
   * 子要素も含めて設定
   */
  export const CategoryMenuPathArray = [
    '/category1',
    '/category1/category11',
    '/category1/category12',
    '/category2',
    '/category3',
    '/category3/category31',
    '/category3/category32',
    '/category3/category33',
    '/category4',
    '/category5',
  ];

  /**
   * 表示する記事数
   */
  export const DisplayPostsCount = 10;

  /**
   * 目次として設定するタグ
   * ※Markdown記事の方は、ReactMarkdownのカスタムコンポーネントの関係で別途指定しているため注意.
   *  => src/parser/markdown/CustomTocBlock.tsx
   */
  export const TocHeadTags = 'h2, h3, h4, h5, h6';

  /**
   * 記事ページで動的にimportする外部script
   */
  export const PostImportScriptArray: ImportScript[] = [];

  export type ImportScript = {
    id: string;
    src: string;
    isAsync: boolean;
    onLoad?: () => void;
  };

  /**
   * 関連記事の最大表示数
   */
  export const MaxRelatedPostsCount = 8;
}

export default SiteSettings;
