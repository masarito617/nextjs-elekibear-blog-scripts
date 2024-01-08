import { SerializedStyles, css } from '@emotion/react';
import { ImageProps } from 'next/image';
import CustomImage from '../CustomImage';

const styleImageWrapper = (props: CustomImageProps) => css`
  position: relative;
  height: ${props.resizeHeight ? props.resizeHeight : 'auto'};
  width: ${props.resizeWidth ? props.resizeWidth : 'auto'};
`;

const styleImage = (props: CustomImageProps) => css`
  object-fit: contain;
  position: relative !important;
  max-width: 100%;
  height: ${props.resizeHeight ? props.resizeHeight : 'auto'} !important;
  width: ${props.resizeWidth ? props.resizeWidth : 'auto'} !important;
`;

type CustomImageProps = ImageProps & {
  src: string;
  href?: string;
  resizeHeight?: string;
  resizeWidth?: string;
  addCss?: SerializedStyles;
  isShowLoading?: boolean;
  priority?: boolean;
};

/**
 * next/image カスタム版
 * サイズ指定せずにアスペクト比を保って表示する
 * https://techlab.q-co.jp/articles/71/
 * @param props
 * @returns
 */
const CustomResizeImage = (props: CustomImageProps) => {
  const addCss = [styleImage(props)];
  if (props.addCss) {
    addCss.push(props.addCss);
  }
  return (
    <div css={styleImageWrapper(props)}>
      <CustomImage
        id={props.id}
        addCss={addCss}
        src={props?.src}
        href={props?.href}
        alt={props.alt}
        isShowLoading={props.isShowLoading}
        priority={props.priority}
      />
    </div>
  );
};
export default CustomResizeImage;
