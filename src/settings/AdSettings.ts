/**
 * 広告関連設定
 */
namespace AdSettings {
  // ===== GoogleAdsence =====

  /**
   * 有効にするか？
   */
  export const IsEnableGoogleAdsence = process.env.NODE_ENV !== 'development';

  /**
   * 広告script
   */
  export const GoogleAdsenceScriptSrc = '【PLEASE INPUT VALUE】';

  /**
   * クライアントID
   */
  export const GoogleAdsenceClientId = '【PLEASE INPUT VALUE】';

  /**
   * ディスプレイ広告ID
   */
  export const GoogleAdsenceDisplaySlotId = '【PLEASE INPUT VALUE】';

  /**
   * 記事内広告ID
   */
  export const GoogleAdsenceContentSlotId = '【PLEASE INPUT VALUE】';
}
export default AdSettings;
