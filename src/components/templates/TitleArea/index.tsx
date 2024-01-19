import { Global, Theme, css, keyframes } from '@emotion/react';
import { useEffect, useState } from 'react';
import TitleAnimationComponent from './TitleAnimation';
import ResizeImage from 'components/common/ResizeImage';
import { TitleAreaUtil } from 'components/templates/TitleArea/TitleAreaUtil';
import { md } from 'style/media';

const fadeInKeyframes = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 100;
  }
`;

const fadeOutKeyframes = keyframes`
  0% {
    opacity: 100;
  }
  100% {
    opacity: 0;
  }
`;

const styleTitleArea = (theme: Theme) => css`
  height: 280px;
  background-color: ${theme.colors.darkBlue};
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
  box-shadow: 0px 12px 12px ${theme.colors.primaryDarkGray};

  ${md(css`
    height: 160px;
    margin-bottom: 14px;
  `)}
`;

const styleLogoWrapper = (theme: Theme) => css`
  margin: auto;
  width: 390px;
  z-index: ${theme.zindex.titleLogo};

  ${md(css`
    width: 180px;
  `)}
`;

const styleLogoImageWrapper = css`
  height: 'auto';
  width: '100%';
`;

const styleLogoImage = css`
  display: none; // 最初は非表示
  animation: ${fadeInKeyframes} 0.5s ease 0s 1 normal; // フェードインさせる
  filter: drop-shadow(6px 6px 0px #333); // 影を付ける
  object-fit: contain;
  position: relative;
  max-width: 100%;
  height: auto;
  width: '100%';
`;

/** ローディング */
const styleLoadingWrapper = css`
  height: 50%;
  width: 100%;
  top: 25%;
  left: 0;
  text-align: center;
  position: absolute;
`;

const styleLoadingImage = css`
  height: 100%;
  width: auto;
`;

const styleLoadingFadeOut = css`
  .${TitleAreaUtil.titleLoadingFadeOutClassName} {
    animation: ${fadeOutKeyframes} 0.7s ease 0s 1 forwards;
  }
`;

/**
 * タイトルエリア
 * @returns
 */
const TitleArea = () => {
  const [render, setRender] = useState(false);
  useEffect(() => {
    setRender(true);
  }, []);

  return (
    <div id={TitleAreaUtil.rootId} css={styleTitleArea}>
      <Global styles={styleLoadingFadeOut} />
      <div css={styleLogoWrapper}>
        {/** next/image だと表示切替が出来なかったためimgタグ固定 */}
        <div css={styleLoadingWrapper}>
          <ResizeImage
            id={TitleAreaUtil.titleLoadingId}
            src="/img/common/image_loading.gif"
            alt=""
            originalWidth={400}
            originalHeight={400}
            resizeWidth={140}
            addCss={styleLoadingImage}
          />
        </div>
        <div css={styleLogoImageWrapper}>
          <ResizeImage
            id={TitleAreaUtil.titleLogoImageId}
            src="/img/common/title_logo.png"
            alt=""
            originalWidth={841}
            originalHeight={480}
            resizeHeight={280}
            addCss={styleLogoImage}
          />
        </div>
      </div>
      {(() => {
        if (render) {
          return <TitleAnimationComponent />;
        }
      })()}
    </div>
  );
};
export default TitleArea;
