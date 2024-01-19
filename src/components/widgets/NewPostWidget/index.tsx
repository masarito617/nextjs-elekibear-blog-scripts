import { css, Theme } from '@emotion/react';
import Link from 'next/link';
import SideWidgetBase from '../WidgetBase';
import ResizeImage from 'components/common/ResizeImage';
import { md } from 'style/media';
import { apiMst, mstData } from 'types/mst-api';

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
  font-size: 14px;
  ${md(css`
    font-size: 12px;
  `)}
`;

const NewPostContent = (props: {
  title: string;
  imageUrl: string;
  postUrl: string;
}) => {
  return (
    <Link css={styleAssetContentLink} href={props.postUrl}>
      <div css={styleAssetsContent}>
        <div css={styleAssetsIconImageWrapper}>
          <ResizeImage
            src={props.imageUrl}
            alt=""
            originalWidth={800}
            originalHeight={600}
            resizeWidth={130}
            addCss={styleAssetsIconImage}
            isShowLoading={true}
          />
        </div>
        <div>
          <div css={styleTitleText}>{props.title}</div>
        </div>
      </div>
    </Link>
  );
};

/**
 * 新着記事ウィジェット
 * @returns
 */
const NewPostWidget = (props: { posts: apiMst.Post[] }) => {
  return (
    <SideWidgetBase title="新着記事">
      {props.posts.map((post: apiMst.Post) => (
        <div key={post.id}>
          <NewPostContent
            title={post.title}
            imageUrl={post.featuredImage}
            postUrl={`/post/${post.slug}`}
          />
        </div>
      ))}
    </SideWidgetBase>
  );
};
export default NewPostWidget;
