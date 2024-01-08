import { css } from '@emotion/react';
import Link from 'next/link';
import SideWidgetBase from '../WidgetBase';
import CustomResizeImage from 'components/common/CustomResizeImage';
import WidgetSettings from 'settings/WidgetSettings';
import { md } from 'style/media';

const styleAppInfoArea = css`
  display: flex;
  align-items: flex-start;
  border-bottom: 0.6px solid;
  border-color: lightgray;
  padding: 8px;
  height: auto;
`;

const styleIconImageWrapper = css`
  margin-right: 18px;
`;

const styleIconImage = css`
  border-radius: 8px;
`;

const styleTitleText = css`
  font-size: 16px;
  ${md(css`
    font-size: 14px;
  `)}
`;

const styleSubText = css`
  font-size: 12px;
  color: gray;
  line-height: 1.3;
`;

const styleStoreBadgeArea = css`
  position: relative;
  display: flex;
  align-items: center;
  height: 56px;
  margin-top: -2px;
`;

const styleBadgeLink = css`
  :hover {
    opacity: 0.8;
  }
`;

const styleReviewArea = css`
  padding: 4px 0px 6px 8px;
`;

const styleReviewLink = css`
  font-size: 14px;
  text-decoration: none;
`;

const AppContent = (props: {
  appTitle: string;
  appDetail: string;
  appIconImageUrl: string;
  appIosAppUrl: string;
  appAndroidAppUrl: string;
}) => {
  return (
    <div css={styleAppInfoArea}>
      <div css={styleIconImageWrapper}>
        <CustomResizeImage
          src={props.appIconImageUrl}
          alt=""
          resizeHeight="112px"
          resizeWidth="112px"
          addCss={styleIconImage}
          isShowLoading={true}
        />
      </div>
      <div>
        <div css={styleTitleText}>{props.appTitle}</div>
        <div css={styleSubText}>{props.appDetail}</div>
        <div css={styleStoreBadgeArea}>
          <a css={styleBadgeLink} href={props.appIosAppUrl}>
            <CustomResizeImage
              src="https://wp-next-elekibear-content.netlify.app/wp-content/uploads/molegoro/store/badge-app-store-ja.svg"
              alt=""
              resizeHeight="33px"
            />
          </a>
          <a css={styleBadgeLink} href={props.appAndroidAppUrl}>
            <CustomResizeImage
              src="https://wp-next-elekibear-content.netlify.app/wp-content/uploads/molegoro/store/badge-google-play-ja.png"
              alt=""
              resizeHeight="49.5px"
            />
          </a>
        </div>
      </div>
    </div>
  );
};
/**
 * 開発アプリウィジェット
 * @returns
 */
const AppWidget = () => {
  const appContentInfoArray = WidgetSettings.AppContentInfoArray;
  if (appContentInfoArray == null || appContentInfoArray.length <= 0) {
    return <></>;
  }

  return (
    <SideWidgetBase title="開発アプリ">
      {appContentInfoArray.map((appContentInfo) => (
        <AppContent
          key={appContentInfo.title}
          appTitle={appContentInfo.title}
          appDetail={appContentInfo.detail}
          appIconImageUrl={appContentInfo.iconImageUrl}
          appIosAppUrl={appContentInfo.iosAppUrl}
          appAndroidAppUrl={appContentInfo.androidAppUrl}
        />
      ))}
      <div css={styleReviewArea}>
        <Link css={styleReviewLink} href="/page/molegoro_app">
          →全てのアプリ一覧
        </Link>
      </div>
    </SideWidgetBase>
  );
};
export default AppWidget;
