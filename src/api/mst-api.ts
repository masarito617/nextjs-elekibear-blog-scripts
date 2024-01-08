import fs from 'fs';
import path from 'path';
import SiteSettings from 'settings/SiteSettings';
import { apiMst, mstData } from 'types/mst-api';

// ========== マスタデータ読み込み ==========

/**
 * マスタデータファイル読み込み共通
 * @param fileName
 * @returns
 */
function readMstDataCsvFile(fileName: string): string[][] {
  // ファイル読み込み
  const filePath: string = path.join(
    process.cwd(),
    SiteSettings.MST_DATA_PATH,
    fileName,
  );
  const readContent: string = fs.readFileSync(filePath, 'utf-8');

  // 1行目は項目名のため、それ以降を対象として読み込む
  const result: string[][] = [];
  const rows: string[] = readContent.split('\n');
  for (let i = 1; i < rows.length; i++) {
    if (rows[i].indexOf(',') < 0) {
      continue;
    }
    const values = rows[i].split(',');
    result.push(values);
  }
  return result;
}

/**
 * 記事マスタの読み込み
 * @returns
 */
function readMstPosts(): mstData.mstPostsRow[] {
  const data = readMstDataCsvFile('mst_posts.csv');

  const result: mstData.mstPostsRow[] = [];
  for (let i = 0; i < data.length; i++) {
    let index = 0;
    const columns = data[i];
    const row: mstData.mstPostsRow = {
      id: columns[index++],
      post_type: columns[index++],
      post_title: columns[index++],
      post_name: columns[index++],
      featured_image: columns[index++],
      post_date: columns[index++],
      post_modified: columns[index++],
    };
    result.push(row);
  }
  return result;
}

/**
 * 分類マスタの読み込み
 * @returns
 */
function readMstTerms(): mstData.mstTermsRow[] {
  const data = readMstDataCsvFile('mst_terms.csv');

  const result: mstData.mstTermsRow[] = [];
  for (let i = 0; i < data.length; i++) {
    let index = 0;
    const columns = data[i];
    const row: mstData.mstTermsRow = {
      id: columns[index++],
      taxonomy: columns[index++],
      name: columns[index++],
      slug: columns[index++],
      parent: columns[index++],
    };
    result.push(row);
  }
  return result;
}

/**
 * 記事、分類の紐付けマスタの読み込み
 * @returns
 */
function readMstTermRelationships(): mstData.mstTermRelationshipsRow[] {
  const data = readMstDataCsvFile('mst_term_relationships.csv');

  const result: mstData.mstTermRelationshipsRow[] = [];
  for (let i = 0; i < data.length; i++) {
    let index = 0;
    const columns = data[i];
    const row: mstData.mstTermRelationshipsRow = {
      post_id: columns[index++],
      term_id: columns[index++],
    };
    result.push(row);
  }
  return result;
}

// ========== マスタデータを使用したAPI==========

/**
 * 全ての投稿データ取得
 * @param postType 取得する記事種別
 * @returns
 */
export function getAllPosts(postType?: string): apiMst.Posts {
  // 投稿データを作成日降順で取得
  let mstPosts = readMstPosts();
  if (postType) {
    mstPosts = mstPosts.filter((post) => post.post_type == postType);
  }
  mstPosts.sort((a, b) => (a.post_date > b.post_date ? -1 : 1));

  // レスポンス形式に変換
  const posts: apiMst.Post[] = [];
  for (let i = 0; i < mstPosts.length; i++) {
    const mstPost = mstPosts[i];
    const post: apiMst.Post = {
      id: mstPost.id,
      title: mstPost.post_title,
      slug: mstPost.post_name,
      date: mstPost.post_date,
      featuredImage: mstPost.featured_image,
      categories: [],
      tags: [],
    };
    posts.push(post);
  }

  // カテゴリとタグを付与する
  const mstTerms = readMstTerms();
  const mstTermRelationships = readMstTermRelationships();
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    posts[i] = addTermsInfoForToPost(post, mstTerms, mstTermRelationships);
  }

  return {
    posts: posts,
  };
}

/**
 * 投稿データor固定ページデータ取得 (slug指定)
 * @returns
 */
export function getPostOrPageBySlug(
  slug: string,
  isOnlyPost: boolean = false,
): apiMst.Post {
  // 全ての投稿データを取得
  let mstPosts = readMstPosts();
  if (isOnlyPost) {
    mstPosts = mstPosts.filter((post) => post.post_type == 'post');
  }

  // 指定slugの投稿データを取得
  const mstPost = mstPosts.find((post) => post.post_name == slug);
  if (mstPost == null) {
    return {
      id: '',
      title: '',
      slug: '',
      date: '',
      featuredImage: '',
      categories: [],
      tags: [],
    };
  }

  // レスポンス形式に変換して返却
  let post: apiMst.Post = {
    id: mstPost.id,
    title: mstPost.post_title,
    slug: mstPost.post_name,
    date: mstPost.post_date,
    featuredImage: mstPost.featured_image,
    categories: [],
    tags: [],
  };
  const mstTerms = readMstTerms();
  const mstTermRelationships = readMstTermRelationships();
  post = addTermsInfoForToPost(post, mstTerms, mstTermRelationships);
  return post;
}

/**
 * 投稿データにカテゴリ、タグを付与して返却
 * @param post
 * @param mstTerms
 * @param mstTermRelationships
 * @returns
 */
function addTermsInfoForToPost(
  post: apiMst.Post,
  mstTerms: mstData.mstTermsRow[],
  mstTermRelationships: mstData.mstTermRelationshipsRow[],
): apiMst.Post {
  // 投稿データに紐づく分類情報を取得
  const postRelationships = mstTermRelationships.filter(
    (mstTermRelationShip) => mstTermRelationShip.post_id == post.id,
  );
  if (postRelationships == null || postRelationships.length <= 0) {
    return post;
  }

  // カテゴリとタグをそれぞれ設定
  const relationshipIds = postRelationships.map((r) => r.term_id);
  post.categories = mstTerms.filter(
    (term) =>
      relationshipIds.findIndex(
        (r) => term.taxonomy == 'category' && Number(r) == Number(term.id),
      ) > -1,
  );
  post.tags = mstTerms.filter(
    (term) =>
      relationshipIds.findIndex(
        (r) => term.taxonomy == 'post_tag' && Number(r) == Number(term.id),
      ) > -1,
  );
  return post;
}

/**
 * 全てのカテゴリ取得
 * @returns
 */
export function getAllCategories(): apiMst.Categories {
  // category指定されているのが対象
  const mstTerms = readMstTerms();
  const mstCategories = mstTerms.filter((term) => term.taxonomy == 'category');

  // 全てのカテゴリを一旦追加
  const categories: apiMst.Category[] = [];
  for (let i = 0; i < mstCategories.length; i++) {
    const mstCategory = mstCategories[i];
    const category: apiMst.Category = {
      id: mstCategory.id,
      name: mstCategory.name,
      slug: mstCategory.slug,
      children: [],
    };
    categories.push(category);
  }

  // 親カテゴリがあるものは追加する
  for (let i = 0; i < mstCategories.length; i++) {
    const mstCategory = mstCategories[i];
    // 親カテゴリが指定されている場合、childrenに追加(1階層まで)
    if (Number(mstCategory.parent) > 0) {
      // 文字列の比較だとなぜか上手くいかなかった...
      const parentIndex = categories.findIndex(
        (category) => Number(category.id) == Number(mstCategory.parent),
      );
      if (parentIndex > -1) {
        categories[parentIndex].children.push({
          id: mstCategory.id,
          name: mstCategory.name,
          slug: mstCategory.slug,
        });
      }
    }
  }

  return {
    categories: categories,
  };
}

/**
 * 子カテゴリIDを全て持たせたカテゴリ情報を取得
 * @param apiMstCategories
 * @returns
 */
export function getAllCategoryIdIncludeChildInfo(
  apiMstCategories: apiMst.Categories,
): apiMst.AllCategoryIdIncludeChildInfo {
  const allCategoryIdIncludeChildInfo: apiMst.AllCategoryIdIncludeChildInfo =
    {};

  // カテゴリごとにループ
  for (let i = 0; i < apiMstCategories.categories.length; i++) {
    const mstCategory = apiMstCategories.categories[i];
    const categoryIds = [mstCategory.id];

    // 子カテゴリIDの設定
    if (mstCategory.children.length > 0) {
      for (let j = 0; j < mstCategory.children.length; j++) {
        const childrenId = mstCategory.children[j].id;
        categoryIds.push(childrenId);

        // 更に子カテゴリが設定されている場合、再起的に設定
        let childrenCategory: apiMst.Category | undefined;
        let isLoop = true;
        while (isLoop) {
          childrenCategory = apiMstCategories.categories.find(
            (category) =>
              category.id == childrenId && category.children.length > 0,
          );
          if (childrenCategory == undefined) {
            isLoop = false;
            break;
          }
          categoryIds.push(childrenCategory.id);
        }
      }
    }

    // 子カテゴリ含めたIDを全て設定
    allCategoryIdIncludeChildInfo[encodeURI(mstCategory.slug).toLowerCase()] = {
      name: mstCategory.name,
      categoryIds: categoryIds,
    };
  }
  return allCategoryIdIncludeChildInfo;
}

/**
 * 全てのタグ取得
 * @returns
 */
export function getAllTags(): apiMst.Tags {
  // post_tag指定されているのが対象
  const mstTerms = readMstTerms();
  const mstTags = mstTerms.filter((term) => term.taxonomy == 'post_tag');

  // 全てのカテゴリを一旦追加
  const tags: apiMst.Tag[] = [];
  for (let i = 0; i < mstTags.length; i++) {
    const mstTag = mstTags[i];
    const tag: apiMst.Tag = {
      id: mstTag.id,
      name: mstTag.name,
      slug: mstTag.slug,
    };
    tags.push(tag);
  }

  return {
    tags: tags,
  };
}

/**
 * IDに一致するTermデータを返却
 * @param id
 * @returns
 */
export function getTermsByIds(ids: string[]): mstData.mstTermsRow[] {
  const mstTerms = readMstTerms();
  return mstTerms.filter((mstTerm) => ids.indexOf(mstTerm.id) > -1);
}
