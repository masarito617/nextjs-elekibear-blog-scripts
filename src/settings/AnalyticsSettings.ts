/**
 * Analytics関連設定
 */
namespace AnalyticsSettings {
  // ===== Google Analytics =====

  /**
   * 有効にするか？
   */
  export const IsEnableGoogleAnalytics = process.env.NODE_ENV !== 'development';

  /**
   * Google Analytics ID
   */
  export const GoogleAnalyticsId = '【PLEASE INPUT VALUE】';
}
export default AnalyticsSettings;
