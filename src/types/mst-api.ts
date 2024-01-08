/**
 * マスタデータ
 */
export namespace mstData {
  // 記事データ
  export type mstPostsRow = {
    id: string;
    post_type: string; // post or page
    post_title: string;
    post_name: string;
    featured_image: string;
    post_date: string;
    post_modified: string;
  };

  // 分類データ
  export type mstTermsRow = {
    id: string;
    taxonomy: string; // category or post_tag
    name: string;
    slug: string;
    parent: string;
  };

  // 記事データと分類データの紐付け
  export type mstTermRelationshipsRow = {
    post_id: string;
    term_id: string;
  };
}

/**
 * マスタデータ関連API
 */
export namespace apiMst {
  // 記事データ
  export type Posts = {
    posts: Post[];
  };
  export type Post = {
    id: string;
    title: string;
    slug: string;
    date: string;
    featuredImage: string;
    categories: PostCategory[];
    tags: PostTag[];
  };
  export type PostCategory = {
    id: string;
    name: string;
    slug: string;
  };
  export type PostTag = {
    id: string;
    name: string;
    slug: string;
  };

  // カテゴリ情報
  export type Categories = {
    categories: Category[];
  };
  export type Category = {
    id: string;
    name: string;
    slug: string;
    children: CategoryChildren[];
  };
  export type CategoryChildren = {
    id: string;
    name: string;
    slug: string;
  };

  // 子カテゴリのIDを全て持たせた情報
  export type AllCategoryIdIncludeChildInfo = {
    [key: string]: { name: string; categoryIds: string[] };
  };

  // タグ情報
  export type Tags = {
    tags: Tag[];
  };
  export type Tag = {
    id: string;
    name: string;
    slug: string;
  };
}
