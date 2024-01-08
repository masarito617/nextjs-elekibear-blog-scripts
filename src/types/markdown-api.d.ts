import { apiMst, mstData } from './mst-api';

export namespace markdownData {
  export type postMeta = {
    mstPost: apiMst.Post; // マスタデータと同じ情報を持たせる
  };
  export type postData = {
    content: string;
    meta: PostMeta;
  };
}
