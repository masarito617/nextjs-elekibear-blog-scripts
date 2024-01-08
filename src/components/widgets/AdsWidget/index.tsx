import { css } from '@emotion/react';
import { useEffect } from 'react';
import SideWidgetBase from '../WidgetBase';
import { ElementUtil } from 'common/ElementUtil';
import AdSettings from 'settings/AdSettings';

const styleAdsWrapper = css`
  padding-bottom: 12px;
`;

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[];
  }
}

/**
 * ディスプレイ広告
 * @param props
 * @returns
 */
const AdsDisplayComponent = (props: { clientId: string; slotId: string }) => {
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
        `}
        data-ad-client={props.clientId}
        data-ad-slot={props.slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
};

/**
 * 広告ウィジェット
 * @returns
 */
const AdsWidget = () => {
  if (!AdSettings.IsEnableGoogleAdsence) {
    return <></>;
  }

  const clientId = AdSettings.GoogleAdsenceClientId;
  const slotId = AdSettings.GoogleAdsenceDisplaySlotId;
  if (!clientId || !slotId) {
    return <></>;
  }

  return (
    <SideWidgetBase title="広告">
      <div css={styleAdsWrapper}>
        <AdsDisplayComponent clientId={clientId} slotId={slotId} />
      </div>
    </SideWidgetBase>
  );
};
export default AdsWidget;
