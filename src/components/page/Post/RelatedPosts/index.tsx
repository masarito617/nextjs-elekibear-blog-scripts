import { css } from '@emotion/react';
import PostCardContentItem from 'components/page/Post/ContentItems/PostCardContentItem';
import SiteSettings from 'settings/SiteSettings';
import { md } from 'style/media';
import { apiMst } from 'types/mst-api';

const styleTitle = css`
  font-size: 20px;
  margin: 40px 8px 8px 8px;
  font-weight: bold;

  ${md(css`
    font-size: 16px;
  `)}
`;

/**
 * 関連記事
 * @returns
 */
const RelatedPosts = (props: { post: apiMst.Post; allPosts: apiMst.Posts }) => {
  let searchPosts: apiMst.Post[] = [];

  // カテゴリに関連する記事を取得
  for (const category of props.post.categories) {
    searchPosts = searchPosts.concat(
      props.allPosts.posts
        .filter((p) => p.categories.some((c) => c.id === category.id))
        .filter((p) => p.id != props.post.id) ?? [],
    );
  }

  // タグに関連する記事を取得
  for (const tag of props.post.tags) {
    searchPosts = searchPosts.concat(
      props.allPosts.posts
        .filter((p) => p.tags.some((t) => t.id === tag.id))
        .filter((p) => p.id != props.post.id) ?? [],
    );
  }

  // 重複削除、新着記事を優先で表示
  searchPosts = Array.from(new Set(searchPosts));
  searchPosts = searchPosts.sort((a, b) => (a.date > b.date ? -1 : 1));

  // 最大表示数に収める
  const maxDisplayPostCount = SiteSettings.MaxRelatedPostsCount;
  if (searchPosts.length > maxDisplayPostCount) {
    searchPosts = searchPosts.slice(0, maxDisplayPostCount);
  }

  // 関連記事が無い場合は表示しない
  if (searchPosts.length <= 0) {
    return <></>;
  }

  return (
    <>
      <div css={styleTitle}>関連記事</div>
      {searchPosts.map((post) => (
        <PostCardContentItem key={post.id} post={post} />
      ))}
    </>
  );
};
export default RelatedPosts;
