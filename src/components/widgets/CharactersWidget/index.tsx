import { css, Theme } from '@emotion/react';
import SideWidgetBase from '../WidgetBase';
import ResizeImage from 'components/common/ResizeImage';
import WidgetSettings from 'settings/WidgetSettings';

const styleRoot = css`
  display: flex;
  flex-flow: column;
`;

/** コンテンツ */
const styleContentL = (theme: Theme) => css`
  position: relative;
  width: 100%;
  height: 100px;
  overflow: hidden;
  background-color: ${theme.colors.primaryLightGray};
`;
const styleContentR = (theme: Theme) => css`
  position: relative;
  width: 100%;
  height: 100px;
  overflow: hidden;
  background-color: ${theme.colors.primaryLightGray};
`;

/** プライマリー背景色 */
const styleRectL = (theme: Theme) => css`
  position: absolute;
  background-color: ${theme.colors.blue};
  transform: skewX(-30deg);
  width: 70%;
  height: 100%;
  left: -20%;
`;
const styleRectR = (theme: Theme) => css`
  position: absolute;
  background-color: ${theme.colors.primaryYellow};
  transform: skewX(30deg);
  width: 70%;
  height: 100%;
  left: 50%;
`;

/** 画像 */
const styleImageWrapperL = css`
  position: absolute;
  left: 10%;
`;
const styleImageWrapperR = css`
  position: absolute;
  left: 60%;
`;

/** テキストエリア */
const styleTextAreaL = (theme: Theme) => css`
  display: flex;
  position: relative;
  flex-flow: column;
  width: 36%;
  height: 100%;
  left: 60%;
  color: ${theme.colors.primaryWhite};
`;
const styleTextAreaR = (theme: Theme) => css`
  display: flex;
  position: relative;
  flex-flow: column;
  width: 40%;
  height: 100%;
  left: 5%;
  color: ${theme.colors.primaryWhite};
`;

/** テキスト */
const styleTextName = css`
  height: 28px;
  font-size: 16px;
  margin-top: 8px;
`;
const styleTextDetail = css`
  top: 30px;
  height: 60px;
  font-size: 10px;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const CharacterContentL = (props: {
  name: string;
  detail: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
}) => {
  return (
    <div css={styleContentL}>
      <div css={styleRectL}></div>
      <div css={styleImageWrapperL}>
        <ResizeImage
          src={props.imageUrl}
          alt={props.name}
          originalWidth={props.imageWidth}
          originalHeight={props.imageHeight}
          resizeHeight={180}
          priority={true}
        />
      </div>
      <div css={styleTextAreaL}>
        <div css={styleTextName}>{props.name}</div>
        <div css={styleTextDetail}>{props.detail}</div>
      </div>
    </div>
  );
};

const CharacterContentR = (props: {
  name: string;
  detail: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
}) => {
  return (
    <div css={styleContentR}>
      <div css={styleRectR}></div>
      <div css={styleImageWrapperR}>
        <ResizeImage
          src={props.imageUrl}
          alt={props.name}
          originalWidth={props.imageWidth}
          originalHeight={props.imageHeight}
          resizeHeight={180}
          priority={true}
        />
      </div>
      <div css={styleTextAreaR}>
        <div css={styleTextName}>{props.name}</div>
        <div css={styleTextDetail}>{props.detail}</div>
      </div>
    </div>
  );
};

/**
 * キャラクターウィジェット
 * @returns
 */
const CharactersWidget = () => {
  const characterInfoArray = WidgetSettings.CharacterInfoArray;
  if (characterInfoArray == null || characterInfoArray.length <= 0) {
    return <></>;
  }

  return (
    <SideWidgetBase title="登場人物">
      <div css={styleRoot}>
        {characterInfoArray.map((characterInfo, index) => {
          if (index % 2 == 0) {
            return (
              <CharacterContentL
                key={characterInfo.name}
                name={characterInfo.name}
                detail={characterInfo.detail}
                imageUrl={characterInfo.imageUrl}
                imageWidth={characterInfo.imageWidth}
                imageHeight={characterInfo.imageHeight}
              />
            );
          } else {
            return (
              <CharacterContentR
                key={characterInfo.name}
                name={characterInfo.name}
                detail={characterInfo.detail}
                imageUrl={characterInfo.imageUrl}
                imageWidth={characterInfo.imageWidth}
                imageHeight={characterInfo.imageHeight}
              />
            );
          }
        })}
      </div>
    </SideWidgetBase>
  );
};
export default CharactersWidget;
