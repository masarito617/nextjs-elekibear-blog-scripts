import AnalyticsSettings from 'settings/AnalyticsSettings';

declare global {
  interface Window {
    gtag: any;
  }
}

/**
 * この関数をページ遷移時に実行することでGoogleAnalyticsにデータを送信する
 * @param url
 */
export const gtagPageView = (url: any) => {
  if (!window?.gtag) {
    return;
  }
  window.gtag('config', AnalyticsSettings.GoogleAnalyticsId, {
    page_path: url,
  });
};
