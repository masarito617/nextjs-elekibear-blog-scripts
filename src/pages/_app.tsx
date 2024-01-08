import { Global, Theme, ThemeProvider, css } from '@emotion/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';
import { gtagPageView } from 'lib/gtag';
import AdSettings from 'settings/AdSettings';
import AnalyticsSettings from 'settings/AnalyticsSettings';
import { styleGlobalAmazonPaApi } from 'style/amazon-paapi-item';
import { md, sm } from 'style/media';
import { styleWordpress } from 'style/wp-style';
import { elekibear } from 'theme/theme';

// グローバルのスタイル
const styleGlobal = (theme: Theme) => css`
  html,
  body,
  textarea {
    margin: 0;
    padding: 0;
    font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN',
      'Hiragino Sans', 'BIZ UDPGothic', Meiryo, sans-serif;
  }
  body {
    /** チェック柄 */
    background: linear-gradient(
        45deg,
        #2a2a2a 25%,
        transparent 25%,
        transparent 75%,
        #2a2a2a 75%
      ),
      linear-gradient(
        45deg,
        #2a2a2a 25%,
        transparent 25%,
        transparent 75%,
        #2a2a2a 75%
      );
    background-color: ${theme.colors.primaryDarkGray};
    background-size: 60px 60px;
    background-position:
      0 0,
      30px 30px;
    font-size: 15px;

    ${md(css`
      font-size: 14px;
    `)}
    ${sm(css`
      font-size: 12px;
    `)}
  }
  ${styleWordpress(theme)}
  ${styleGlobalAmazonPaApi(theme)}
`;

const MyApp = ({ Component, pageProps }: AppProps) => {
  // GoogleAnalyticsによる計測対応
  const router = useRouter();
  useEffect(() => {
    const handleRouterChange = (url: any) => {
      gtagPageView(url);
    };
    router.events.on('routeChangeComplete', handleRouterChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouterChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        {/** SEO関連はHeadMetaコンポーネント内で設定している */}
        <meta key="charset" name="charset" content="utf-8" />
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=5"
        />
        <link rel="preload" href="/img/common/image_loading.gif" as="image" />
        <link
          rel="icon"
          href="/favicon/favicon_elekibear.png"
          sizes="192x192"
        ></link>
      </Head>
      {/** GoogleAdsence広告用Script */}
      {AdSettings.IsEnableGoogleAdsence && AdSettings.GoogleAdsenceScriptSrc ? (
        <Script
          async
          src={AdSettings.GoogleAdsenceScriptSrc}
          crossOrigin="anonymous"
        />
      ) : (
        <></>
      )}
      {/** GoogleAnalytics広告用Script */}
      {AnalyticsSettings.IsEnableGoogleAnalytics ? (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${AnalyticsSettings.GoogleAnalyticsId}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());

         gtag('config', '${AnalyticsSettings.GoogleAnalyticsId}');
         `,
            }}
          />
        </>
      ) : (
        <></>
      )}
      {/* Themeを有効にする */}
      <ThemeProvider theme={elekibear}>
        <Global styles={styleGlobal} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};
export default MyApp;
