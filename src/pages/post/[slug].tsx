import path from 'path';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getAllMarkdownPosts } from 'api/markdown-api';
import {
  getAllCategories,
  getAllCategoryIdIncludeChildInfo,
  getAllPosts,
  getAllTags,
  getPostOrPageBySlug,
} from 'api/mst-api';
import { FileUtil } from 'common/FileUtil';
import PostBasePage, {
  PostBasePageProps,
} from 'components/page/Post/PostBasePage';
import SiteSettings from 'settings/SiteSettings';
import { markdownData } from 'types/markdown-api';
import { apiMst } from 'types/mst-api';

/**
 * 対象とする記事種別
 */
const TargetPostType = 'post';

/**
 * 投稿記事ページ
 * @returns
 */
const PostPage: NextPage<PostBasePageProps> = (props: PostBasePageProps) => {
  return <PostBasePage {...props} />;
};
export default PostPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug: string = typeof params?.slug === 'string' ? params?.slug : '';
  const allPosts: apiMst.Posts = getAllPosts(TargetPostType);
  const allCategories = getAllCategories();
  const allCategoryIdIncludeChildInfo =
    getAllCategoryIdIncludeChildInfo(allCategories);
  const allTags: apiMst.Tags = getAllTags();

  // マークダウンの記事データも追加
  const allMarkdownPost: markdownData.postData[] = getAllMarkdownPosts(
    allCategories,
    allTags,
    TargetPostType,
  );
  allMarkdownPost.forEach((markdownPost) => {
    allPosts.posts.unshift(markdownPost.meta.mstPost);
  });

  // マークダウン or HTMLText記事でそれぞれ取得する
  let post: apiMst.Post;
  let postContent: string;
  let isMarkdown: boolean = false;

  // 記事データ読込
  // Markdown記事を優先で読み込む
  const markdownPost = allMarkdownPost.find(
    (post) => encodeURI(slug).toLowerCase() == post.meta.mstPost.slug,
  );
  if (markdownPost) {
    // ===== Markdown記事 =====
    isMarkdown = true;
    post = markdownPost.meta.mstPost;
    postContent = markdownPost.content;
  } else {
    // ===== HTMLText記事 =====
    post = getPostOrPageBySlug(slug);
    const postFilePath = path.join(
      process.cwd(),
      SiteSettings.HTML_TEXT_POSTS_PATH,
      encodeURI(slug).toLowerCase() + '.txt',
    );
    postContent = FileUtil.tryReadFileSync(postFilePath);
    postContent = encodeURI(postContent); // Netlifyでのビルド時に上手く渡せない場合があったので一旦エンコード
  }

  // URLパス
  const postUrlPath = `/post/${encodeURI(slug).toLowerCase()}`;

  // サイドバーを表示するか？
  const isShowSidebar = true;

  return {
    props: {
      post,
      postContent,
      postUrlPath,
      isMarkdown,
      slug,
      allPosts,
      allCategories,
      allCategoryIdIncludeChildInfo,
      allTags,
      isShowSidebar,
    },
  };
};

// 全てのslugを取得してページ生成
export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts: apiMst.Posts = getAllPosts(TargetPostType);

  // マークダウンの記事データも追加
  const allMarkdownPost = getAllMarkdownPosts(null, null, TargetPostType);
  allMarkdownPost.forEach((markdownPost) => {
    allPosts.posts.push(markdownPost.meta.mstPost);
  });

  return {
    paths: allPosts.posts.map((post) => `/post/${post.slug}`) || [],
    fallback: false,
  };
};
