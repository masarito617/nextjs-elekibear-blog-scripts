import { css, Theme } from '@emotion/react';
import Link from 'next/link';
import SideWidgetBase from '../WidgetBase';
import CustomResizeImage from 'components/common/CustomResizeImage';
import WidgetSettings from 'settings/WidgetSettings';
import { md } from 'style/media';

const styleAssetsContent = css`
  display: flex;
  align-items: flex-start;
  border-top: 0.6px solid;
  border-color: lightgray;
  padding: 8px;
  height: auto;
  transition: 0.3s ease-in-out 0s;
  :hover {
    background-color: rgba(34, 34, 34, 0.05);
  }
`;

const styleAssetContentLink = css`
  text-decoration: none;
`;

const styleAssetsIconImageWrapper = css`
  margin-right: 12px;
  width: 130px;
  height: 97.5px;
`;

const styleAssetsIconImage = css`
  object-fit: cover;
  border-radius: 6px;
`;

const styleTitleText = (theme: Theme) => css`
  color: ${theme.colors.primaryDarkGray};
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

const AssetPostContent = (props: {
  title: string;
  detail: string;
  imageUrl: string;
  postUrl: string;
}) => {
  return (
    <Link css={styleAssetContentLink} href={props.postUrl}>
      <div css={styleAssetsContent}>
        <div css={styleAssetsIconImageWrapper}>
          <CustomResizeImage
            src={props.imageUrl}
            alt=""
            resizeHeight="97.5px"
            resizeWidth="130px"
            addCss={styleAssetsIconImage}
            isShowLoading={true}
          />
        </div>
        <div>
          <div css={styleTitleText}>{props.title}</div>
          <div css={styleSubText}>{props.detail}</div>
        </div>
      </div>
    </Link>
  );
};

/**
 * アセット紹介ウィジェット
 * @returns
 */
const AssetPostWidget = () => {
  const assetPostInfoArray = WidgetSettings.AssetPostInfoArray;
  if (assetPostInfoArray == null || assetPostInfoArray.length <= 0) {
    return <></>;
  }

  return (
    <SideWidgetBase title="アセット紹介記事">
      {assetPostInfoArray.map((assetPostInfo) => (
        <AssetPostContent
          key={assetPostInfo.postUrl}
          title={assetPostInfo.title}
          detail={assetPostInfo.detail}
          imageUrl={assetPostInfo.imageUrl}
          postUrl={assetPostInfo.postUrl}
        />
      ))}
    </SideWidgetBase>
  );
};
export default AssetPostWidget;
