import { css } from '@emotion/react';
import ResizeImage from 'components/common/ResizeImage';

const styleEyeCatchImgWrapper = css`
  position: relative;
  max-width: 100%;
  overflow: hidden;
  margin-bottom: 32px;
`;

const styleEyeCatchImgAddCss = css`
  width: 100% !important;
  height: auto;
  transition: ease-in-out 0.2s;
  transform: scale(1);
  &:hover {
    transform: scale(1.2);
  }
`;

interface EyeCatchImageProps {
  sourceUrl: string;
}

/**
 * 記事ページ アイキャッチ画像
 * @param props
 * @returns
 */
const EyeCatchImage = (props: EyeCatchImageProps) => {
  if (!props.sourceUrl) {
    return <></>;
  }
  return (
    <div css={styleEyeCatchImgWrapper}>
      <ResizeImage
        addCss={styleEyeCatchImgAddCss}
        src={props.sourceUrl}
        alt=""
        originalWidth={800}
        originalHeight={600}
        priority={true}
        isShowLoading={true}
      />
    </div>
  );
};
export default EyeCatchImage;
