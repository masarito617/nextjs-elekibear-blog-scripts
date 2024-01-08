// ******************************
// wordPressのDBから直接取得していた時のコード
// ******************************

// import { URL } from 'url';
// import { HeaderType } from 'types/wp-api';

// const API_URL: URL = new URL(process.env.WORDPRESS_API_URL ?? '');

// /**
//  * API fetch 共通
//  * @param query
//  * @param param1
//  * @returns
//  */
// async function fetchAPI(query = '', { variables }: Record<string, any> = {}) {
//   const headers: HeaderType = { 'Content-Type': 'application/json' };

//   if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
//     headers[
//       'Authorization'
//     ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
//   }

//   const res = await fetch(API_URL, {
//     headers,
//     method: 'POST',
//     body: JSON.stringify({
//       query,
//       variables,
//     }),
//   });

//   const json = await res.json();
//   if (json.errors) {
//     console.error(json.errors);
//     throw new Error('Failed to fetch API');
//   }
//   return json.data;
// }

// /**
//  * 全ての投稿データ取得 (Home画面用)
//  * @param isPreview
//  * @returns
//  */
// export async function getAllPosts(isPreview: boolean) {
//   const query = createGetAllPostQuery();
//   const data = await fetchAPI(query, {
//     variables: {
//       onlyEnabled: !isPreview,
//       isPreview,
//     },
//   });
//   return data?.posts;
// }

// // /**
// //  * 全ての投稿データ取得 (category指定)
// //  * @param categoryIdArray
// //  * @returns
// //  */
// // export async function getAllPostsByCategoryId(categoryIdArray: string[]) {
// //   // 最大取得件数を一旦1000件に指定している
// //   // 最大数を変更するにはwordpress側での変更する必要がある
// //   // https://www.wpgraphql.com/filters/graphql_connection_max_query_amount
// //   const query = createGetAllPostQuery({ categoryIdArray: categoryIdArray });
// //   const data = await fetchAPI(query);
// //   return data?.posts;
// // }

// function createGetAllPostQuery(params: { categoryIdArray?: string[] } = {}) {
//   // SSGだけで後から書き換えるので文字列埋め込みでよいでしょう・・・
//   let whereQuery = 'orderby: { field: DATE, order: DESC }';
//   if (params?.categoryIdArray) {
//     whereQuery += `, categoryIn: ["${params?.categoryIdArray.join('","')}"]`;
//   }
//   if (whereQuery) {
//     whereQuery = `, where: { ${whereQuery} }`;
//   }
//   // 最大取得件数を一旦1000件に指定している
//   // 最大数を変更するにはwordpress側での変更する必要がある
//   // https://www.wpgraphql.com/filters/graphql_connection_max_query_amount
//   return `
//   query AllPosts {
//     posts(first: 1000 ${whereQuery}) {
//       edges {
//         node {
//           title
//           excerpt
//           slug
//           date
//           featuredImage {
//             node {
//               sourceUrl
//             }
//           }
//           categories {
//             nodes {
//               id
//               categoryId
//               name
//             }
//           }
//         }
//       }
//     }
//   }
//   `;
// }

// /**
//  * 全ての投稿データ取得 (slugのみ)
//  * @returns
//  */
// export async function getAllPostsWithSlug() {
//   const data = await fetchAPI(`
//     {
//       posts(first: 1000) {
//         edges {
//           node {
//             slug
//           }
//         }
//       }
//     }
//   `);
//   return data?.posts;
// }

// /**
//  * 投稿データ取得 (slug指定)
//  * @param paramSlug
//  * @returns
//  */
// export async function getPostBySlug(paramSlug: string) {
//   const data = await fetchAPI(
//     `
//     fragment AuthorFields on User {
//       name
//       firstName
//       lastName
//       avatar {
//         url
//       }
//     }
//     fragment PostFields on Post {
//       title
//       excerpt
//       slug
//       date
//       featuredImage {
//         node {
//           sourceUrl
//         }
//       }
//       author {
//         node {
//           ...AuthorFields
//         }
//       }
//       categories {
//         edges {
//           node {
//             name
//           }
//         }
//       }
//       tags {
//         edges {
//           node {
//             name
//           }
//         }
//       }
//     }
//     query PostBySlug($slug: String) {
//       postBy(slug: $slug) {
//         ...PostFields
//         content
//       }
//     }
//   `,
//     {
//       variables: {
//         slug: paramSlug,
//       },
//     },
//   );
//   return data?.postBy;
// }

// /**
//  * 全てのカテゴリーを取得
//  * @returns
//  */
// export async function getAllCategories() {
//   const query = createGetAllCategoriesQuery();
//   const data = await fetchAPI(query);
//   return data;
// }

// /**
//  * 全てのカテゴリーを取得(名前指定)
//  * @returns
//  */
// export async function getAllCategoriesForSlug(categorySlug: string) {
//   const query = createGetAllCategoriesQuery({ categorySlug: categorySlug });
//   console.log(query);
//   const data = await fetchAPI(query);
//   return data;
// }

// function createGetAllCategoriesQuery(params: { categorySlug?: string } = {}) {
//   // SSGだけで後から書き換えるので文字列埋め込みでよいでしょう・・・
//   let whereQuery = '';
//   if (params?.categorySlug) {
//     whereQuery += `slug: "${params?.categorySlug}"`;
//   }
//   if (whereQuery) {
//     whereQuery = `, where: { ${whereQuery} }`;
//   }
//   // 最大取得件数を一旦1000件に指定している
//   return `
//   query NewQuery {
//     categories(first: 1000 ${whereQuery}) {
//       edges {
//         node {
//           id
//           name
//           parentId
//           slug
//           children(first: 1000) {
//             nodes {
//               id
//               slug
//             }
//           }
//         }
//       }
//     }
//   }
//   `;
// }
