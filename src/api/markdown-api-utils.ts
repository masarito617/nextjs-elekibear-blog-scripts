import path from 'path';
import matter from 'gray-matter';
import { markdownData } from 'types/markdown-api';
import { apiMst } from 'types/mst-api';

export type markdownPostMatterData = {
  content: string;
  meta: any;
  slug: string;
};

/**
 * Markdownデータを記事とメタデータに変換
 * @param filePath
 * @returns
 */
export function convertMarkdownPostMatterData(
  markdownData: string,
  filePath: string,
): markdownPostMatterData {
  const { content: content, data: data } = matter(markdownData);
  const slug = path.basename(filePath).replace('.md', ''); // ファイル名をslugとする
  return { content: content, meta: data, slug: slug };
}

/**
 * Markdown記事データをレスポンス形式に変換
 * @param data
 * @returns
 */
export function convertResponseMarkdownPostData(
  data: markdownPostMatterData,
  allCategories: apiMst.Categories | null,
  allTags: apiMst.Tags | null,
): markdownData.postData {
  const content = data.content;
  const meta = data.meta;
  const postSlug = data.slug;

  let mstPost: apiMst.Post = {
    id: postSlug, // idはslugを指定
    title: meta.title,
    slug: postSlug,
    date: meta.post_date,
    featuredImage: meta.featured_image,
    categories: [],
    tags: [],
  };
  mstPost = addTermsInfoForToPost(
    mstPost,
    meta.categoryIds,
    meta.tagIds,
    allCategories,
    allTags,
  );

  // メタデータ作成
  const postMeta: markdownData.postMeta = {
    mstPost: mstPost,
  };

  // 記事データとして設定
  const postData: markdownData.postData = {
    content: content,
    meta: postMeta,
  };
  return postData;
}

/**
 * 投稿データにカテゴリ、タグを付与して返却
 * MstTermsのCSVデータから検索して設定する
 */
function addTermsInfoForToPost(
  post: apiMst.Post,
  metaCategoryIds: string,
  metaTagIds: string,
  allCategories: apiMst.Categories | null,
  allTags: apiMst.Tags | null,
): apiMst.Post {
  // カテゴリ
  if (metaCategoryIds && allCategories?.categories) {
    metaCategoryIds = metaCategoryIds.replaceAll(' ', '');
    const tmpCategoryIds = metaCategoryIds.split(',');
    const categoryIds = Array.isArray(tmpCategoryIds)
      ? tmpCategoryIds
      : new Array(metaCategoryIds);
    post.categories = getCategoriesByIds(categoryIds, allCategories);
  }
  // タグ
  if (metaTagIds && allTags?.tags) {
    metaTagIds = metaTagIds.replaceAll(' ', '');
    const tmpTagIds = metaTagIds.split(',');
    const tagIds = Array.isArray(tmpTagIds) ? tmpTagIds : new Array(metaTagIds);
    post.tags = getTagsByIds(tagIds, allTags);
  }
  return post;
}

/**
 * IDに一致するカテゴリ情報を返却
 * @param id
 * @returns
 */
function getCategoriesByIds(
  ids: string[],
  allCategories: apiMst.Categories,
): apiMst.PostCategory[] {
  // 指定されたIDでフィルタ
  const filterCategories: apiMst.Category[] = [];
  ids.forEach((id) => {
    const category = allCategories.categories.find(
      (category) => category.id == id,
    );
    if (category) {
      filterCategories.push(category);
    }
  });
  // 記事のカテゴリ情報に変換して返却
  const result: apiMst.PostCategory[] = [];
  filterCategories.forEach((category) => {
    result.push({
      id: category.id,
      name: category.name,
      slug: category.slug,
    });
  });
  return result;
}

/**
 * IDに一致するタグ情報を返却
 * @param id
 * @returns
 */
function getTagsByIds(ids: string[], allTags: apiMst.Tags): apiMst.PostTag[] {
  // 指定されたIDでフィルタ
  const filterTags: apiMst.Tag[] = [];
  ids.forEach((id) => {
    const tag = allTags.tags.find((tag) => tag.id == id);
    if (tag) {
      filterTags.push(tag);
    }
  });
  // 記事のカテゴリ情報に変換して返却
  const result: apiMst.PostTag[] = [];
  filterTags.forEach((tag) => {
    result.push({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
    });
  });
  return result;
}
