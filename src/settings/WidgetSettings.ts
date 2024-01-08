/**
 * サイドバーウィジェット用設定 (ダミーデータ)
 */
namespace WidgetSettings {
  /**
   * お知らせウィジェット
   * お知らせの内容を設定する
   */
  export const NoticeContent = '<div>ダミーデータによるサンプルブログです。</div>';

  /**
   * キャラクターウィジェット
   */
  export const CharacterInfoArray: CharacterInfo[] = [];

  export type CharacterInfo = {
    name: string;
    detail: string;
    imageUrl: string;
  };

  /**
   * アセット記事ウィジェット
   */
  export const AssetPostInfoArray: AssetPostInfo[] = [];

  export type AssetPostInfo = {
    title: string;
    detail: string;
    imageUrl: string;
    postUrl: string;
  };

  /**
   * 開発アプリウィジェット
   */
  export const AppContentInfoArray = [];

  export type AppContentInfo = {
    title: string;
    detail: string;
    iconImageUrl: string;
    iosAppUrl: string;
    androidAppUrl: string;
  };

  /**
   * カテゴリウィジェット
   * 表示するカテゴリについて子要素も含めて設定
   */
  export const CategoryWidgetPathArray = [
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
}

export default WidgetSettings;
