import { Theme, css } from '@emotion/react';
import PostCard from 'components/page/Index/PostCard';
import { xl } from 'style/media';
import { apiMst } from 'types/mst-api';

const styleRoot = css`
  // 中央寄せにしつつ中身を右寄せにする
  // https://www.memory-lovers.blog/entry/2020/01/23/123000
  display: grid;
  grid-template-columns: repeat(auto-fit, 47.5%);
  justify-content: center;

  ${xl(css`
    grid-template-columns: repeat(auto-fit, 49%);
  `)}
`;

const styleNotPost = (theme: Theme) => css`
  color: ${theme.colors.primaryWhite};
  text-align: center;
  height: 60px;
  line-height: 60px;
`;

interface PostCardListProps {
  allPosts: apiMst.Post[];
}

/**
 * 投稿カードリスト
 * @param props
 * @returns
 */
const PostCardList = (props: PostCardListProps) => {
  const postCardIdPrefix = 'postcard_';

  if (props.allPosts.length <= 0) {
    return <div css={styleNotPost}>該当する記事はありません。</div>;
  }

  return (
    <div css={styleRoot}>
      {props.allPosts.map((post: apiMst.Post, i: number) => (
        <PostCard
          key={post.slug}
          id={postCardIdPrefix + i}
          src={post.featuredImage}
          category={post.categories[0].name}
          title={post.title}
          date={post.date}
          slug={post.slug}
        />
      ))}
    </div>
  );
};
export default PostCardList;
