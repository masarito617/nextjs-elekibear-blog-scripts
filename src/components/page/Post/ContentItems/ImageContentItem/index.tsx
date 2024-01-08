import { Theme, css } from '@emotion/react';
import Image from 'next/image';
import { useState } from 'react';

const styleImageWrapper = () => css`
  position: relative;
`;

const styleImage = (width: string, height: string, isBorder: boolean) => css`
  object-fit: contain;
  position: relative !important;
  max-width: 100%;
  width: ${width ? width : '600px'} !important;
  height: ${height ? height : 'auto'} !important;
  border: ${isBorder ? '1px solid gray' : 'none'};
`;

const stylePopup = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: ${theme.zindex.imagePopup};
  overflow-y: scroll;
`;

const stylePopupImageWrapper = css`
  position: relative;
  width: 80vw;
  height: auto;
  max-width: 1000px;
  max-height: 95vh;
`;

const styleDetailText = css`
  margin-top: -4px;
  margin-left: 4px;
`;

/**
 * 記事用カスタムImage
 * Markdown内で指定した画像をnext/imageに変換する
 * src/components/common/PopupImage/index.tsx と合わせる
 * @param node
 * @returns
 */
const ImageContentItem = ({ node }: any) => {
  // 画像ポップアップ用
  // https://zenn.dev/najo/articles/e3003d14fae4a6
  const [isPopup, setIsPopup] = useState(false);

  // alt属性に仕込んだパラメータを取得する
  // https://amirardalan.com/blog/use-next-image-with-react-markdown
  const image = node.children[0];
  const metastring = image.properties.alt;
  const alt = metastring?.replace(/ *\{[^)]*\} */g, '');
  const width = metastring?.match(/{width:(.*?)}/)?.pop();
  const height = metastring?.match(/{height:(.*?)}/)?.pop();
  const isPriority = metastring?.toLowerCase().match('{priority}');
  const isBorder = metastring?.toLowerCase().match('{border}');

  // 画像指定直下にテキストがあれば合わせて表示する
  const detailText =
    node.children.length > 1 && node.children[1].type == 'text'
      ? node.children[1].value
      : null;

  return (
    <>
      <div onClick={() => setIsPopup(true)} css={[styleImageWrapper()]}>
        <Image
          css={[styleImage(width, height, isBorder)]}
          src={image.properties.src}
          alt={alt}
          priority={isPriority}
          fill
          sizes="auto"
        />
        {detailText && <div css={styleDetailText}>{detailText}</div>}
      </div>
      {/** 画像ポップアップ部分 */}
      {isPopup && (
        <div onClick={() => setIsPopup(false)} css={stylePopup}>
          <div css={[stylePopupImageWrapper]}>
            <Image
              css={[styleImage('100%', '', false)]}
              src={image.properties.src}
              alt={alt}
              priority={isPriority}
              fill
              sizes="auto"
            />
          </div>
        </div>
      )}
    </>
  );
};
export default ImageContentItem;
