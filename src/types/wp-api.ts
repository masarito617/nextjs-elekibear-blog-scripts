// ******************************
// wordPressのDBから直接取得していた時のコード
// ******************************

// export type HeaderType = {
//   'Content-Type': string;
//   Authorization?: string;
// };

// // GraphQL共通
// interface Node<T> {
//   node: T;
// }
// interface Nodes<T> {
//   nodes: T[];
// }
// interface Edge<T> {
//   edge: T;
// }
// interface Edges<T> {
//   edges: T[];
// }

// export namespace apiTypeGetAllPosts {
//   export type Posts = Edges<Post>;
//   export type Post = Node<PostNode>;
//   type PostNode = {
//     title: string;
//     slug: string;
//     date: string;
//     featuredImage: Node<PostNodeFeaturedImageNode>;
//     categories: Nodes<PostNodeCategoriesNode>;
//   };
//   type PostNodeFeaturedImageNode = {
//     sourceUrl: string;
//   };
//   type PostNodeCategoriesNode = {
//     id: string;
//     categoryId: string;
//     name: string;
//   };
// }

// export namespace apiTypeGetAllPostsWithSlug {
//   export type Posts = Edges<Post>;
//   export type Post = Node<PostNode>;
//   type PostNode = {
//     slug: string;
//   };
// }

// export namespace apiTypeGetPostBySlug {
//   export type Post = {
//     title: string;
//     slug: string;
//     date: string;
//     featuredImage: Node<PostNodeFeaturedImageNode>;
//     categories: Edges<Node<PostNodeCategoriesNode>>;
//     tags: Edges<Node<PostNodeTagsNode>>;
//     content: string;
//   };
//   type PostNodeFeaturedImageNode = {
//     sourceUrl: string;
//   };
//   type PostNodeCategoriesNode = {
//     name: string;
//   };
//   type PostNodeTagsNode = {
//     name: string;
//   };
// }

// export namespace apiTypeGetAllCategories {
//   export type Categories = {
//     categories: Edges<Node<PostNodeCategoriesNode>>;
//   };
//   export type PostNodeCategoriesNode = {
//     id: string;
//     name: string;
//     parentId: string;
//     slug: string;
//     children: Nodes<PostNodeCategoriesNodeChildrenNode>;
//   };
//   export type PostNodeCategoriesNodeChildrenNode = {
//     id: string;
//     slug: string;
//   };
// }
