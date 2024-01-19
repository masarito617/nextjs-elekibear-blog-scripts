import { Theme, css, SerializedStyles, useTheme } from '@emotion/react';
import Image, { ImageProps } from 'next/image';

type ResizeImageProps = ImageProps & {
  originalWidth: number;
  originalHeight: number;
  resizeWidth?: number;
  resizeHeight?: number;
  addCss?: SerializedStyles;
  isShowLoading?: boolean;
};

const styleLoadImage = (theme: Theme) => css`
  background: url(/img/common/image_loading.gif) 50% 50% no-repeat;
  background-size: auto 50%;
  background-color: ${theme.colors.darkBlue};
`;

/**
 * 画像リサイズコンポーネント
 * @param props
 * @returns
 */
const ResizeImage = (props: ResizeImageProps) => {
  const theme = useTheme();

  // ローディング指定があればCSSを追加設定
  const styles: SerializedStyles[] = [];
  if (props.addCss) {
    styles.push(props.addCss);
  }
  if (props.isShowLoading) {
    styles.push(styleLoadImage(theme));
  }

  // リサイズ指定されている場合、比率を計算して設定
  let width = props.originalWidth;
  let height = props.originalHeight;
  if (props.resizeWidth) {
    const ratio = width / props.resizeWidth;
    width /= ratio;
    height /= ratio;
  } else if (props.resizeHeight) {
    const ratio = height / props.resizeHeight;
    width /= ratio;
    height /= ratio;
  }

  return (
    <Image
      id={props.id}
      src={props.src}
      alt={props.alt}
      priority={props.priority}
      width={width}
      height={height}
      css={styles}
    />
  );
};
export default ResizeImage;
