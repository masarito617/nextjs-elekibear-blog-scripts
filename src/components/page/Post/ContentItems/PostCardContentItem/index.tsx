import { Theme, css } from '@emotion/react';
import Link from 'next/link';
import CustomResizeImage from 'components/common/CustomResizeImage';
import { md } from 'style/media';
import { apiMst } from 'types/mst-api';

const styleRoot = (theme: Theme) => css`
  display: flex;
  border: 2px solid ${theme.colors.primaryDarkGray};
  border-radius: 8px;
  box-shadow: 4px 4px 8px 2px rgba(0, 0, 0, 0.3);
  margin-bottom: 18px;
  text-decoration: none;
  overflow: hidden;

  cursor: pointer;
  transition: ease-in-out 0.2s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }
`;

const styleImageWrapper = css`
  margin-right: 12px;
  width: 180px;
  height: 120px;
`;

const styleIconImage = css`
  object-fit: cover;
`;

const stylePostInfoArea = css`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 14px 12px;
  padding-left: 2px;
  font-size: 16px;
  width: 100%;

  ${md(css`
    font-size: 12px;
  `)}
`;

const stylePostInfoTitle = css`
  font-weight: bold;
`;

const stylePostInfoDate = css`
  position: absolute;
  bottom: 12px;
  right: 16px;
`;

/**
 * 記事カード
 * @param props
 * @returns
 */
const PostCardContentItem = (props: { post: apiMst.Post }) => {
  const post = props.post;
  return (
    <Link
      href={`/post/${post.slug}`}
      css={css`
        text-decoration: none;
        color: black;
      `}
    >
      <div css={styleRoot}>
        <div css={styleImageWrapper}>
          <CustomResizeImage
            src={post.featuredImage}
            alt=""
            resizeHeight={'120px'}
            resizeWidth={'180px'}
            addCss={styleIconImage}
            isShowLoading={true}
          />
        </div>
        <div css={stylePostInfoArea}>
          <div css={stylePostInfoTitle}>{post.title}</div>
          <div css={stylePostInfoDate}>{post.date.substring(0, 10)}</div>
        </div>
      </div>
    </Link>
  );
};
export default PostCardContentItem;
