import { Theme, SerializedStyles, css, useTheme } from '@emotion/react';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';

type CustomImageProps = ImageProps & {
  src: string;
  href?: string;
  addCss?: SerializedStyles | SerializedStyles[];
  isShowLoading?: boolean;
  priority?: boolean;
};

const styleLoadImage = (theme: Theme) => css`
  background: url(/img/common/image_loading.gif) 50% 50% no-repeat;
  background-size: auto 50%;
  background-color: ${theme.colors.darkBlue};
`;

// next/Image はサーバサイドでしか動作しないため、通常のimgと切り替えれるようにしておく
const CustomImage = (props: CustomImageProps) => {
  const theme = useTheme();
  let styles: SerializedStyles[] = [];
  if (props.addCss) {
    if (Array.isArray(props.addCss)) {
      styles = props.addCss;
    } else {
      styles.push(props.addCss);
    }
  }
  if (props.isShowLoading) {
    styles.push(styleLoadImage(theme));
  }

  if (props.href) {
    return (
      <Link href={props.href} target="_blank">
        <Image
          src={props.src}
          alt=""
          css={styles}
          priority={props.priority}
          fill
          sizes="auto"
        />
      </Link>
    );
  }
  return (
    <Image
      src={props.src}
      alt=""
      css={styles}
      priority={props.priority}
      fill
      sizes="auto"
    />
  );
  // // eslint-disable-next-line @next/next/no-img-element
  // return (
  //   <img id={props.id} src={props.src} alt={props.alt} css={props.addCss} />
  // );
};
export default CustomImage;
