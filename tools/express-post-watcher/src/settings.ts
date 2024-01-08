/**
 * Tool設定
 */
namespace ToolSettings {
  /**
   * 監視対象パス
   * 記事ファイルが格納されているパスを指定
   */
  export const WATCH_POST_DIR = 'data/posts-md';

  /**
   * 記事ファイルが変更された際に通知するイベント名
   */
  export const CHANGE_POST_EVENT_NAME = 'postMdChange';

  /**
   * 監視するクライアント側のURL
   */
  export const CLIENT_URL = 'http://localhost:3000';

  /**
   * サーバ側の起動ポート
   */
  export const SEAVER_PORT = 4000;
}
export default ToolSettings;
