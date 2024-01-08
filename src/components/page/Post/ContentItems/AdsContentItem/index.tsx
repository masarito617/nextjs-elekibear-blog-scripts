import { css } from '@emotion/react';
import { useEffect } from 'react';
import { ElementUtil } from 'common/ElementUtil';
import AdSettings from 'settings/AdSettings';

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[];
  }
}

/**
 * 記事内広告
 * @param props
 * @returns
 */
const AdsContentComponent = (props: { clientId: string; slotId: string }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <>
      <ins
        className="adsbygoogle"
        css={css`
          display: block;
          text-align: center;
        `}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={props.clientId}
        data-ad-slot={props.slotId}
      ></ins>
    </>
  );
};

/**
 * 記事内広告アイテム
 * @returns
 */
const AdsContentItem = () => {
  if (!AdSettings.IsEnableGoogleAdsence) {
    return <></>;
  }

  const clientId = AdSettings.GoogleAdsenceClientId;
  const slotId = AdSettings.GoogleAdsenceContentSlotId;
  if (!clientId || !slotId) {
    return <></>;
  }

  return (
    <>
      <AdsContentComponent clientId={clientId} slotId={slotId} />
      <br />
    </>
  );
};
export default AdsContentItem;
