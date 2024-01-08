import fs from 'fs';
import {
  convertMarkdownPostMatterData,
  convertResponseMarkdownPostData,
  markdownPostMatterData,
} from './markdown-api-utils';
import SiteSettings from 'settings/SiteSettings';
import { markdownData } from 'types/markdown-api';
import { apiMst } from 'types/mst-api';

/**
 * 全ての投稿データ取得
 * @param postType 取得する記事種別
 */
export function getAllMarkdownPosts(
  allCategories: apiMst.Categories | null,
  allTags: apiMst.Tags | null,
  postType?: string,
): markdownData.postData[] {
  // 最終的にはMstDataの形式と合わせて返却する
  const result: markdownData.postData[] = [];

  // 読み込むフォルダ
  // 開発時のみプレビューフォルダも対象にする
  const readDirArray: string[] = [SiteSettings.MARKDOWN_POSTS_PATH];
  if (process.env.NODE_ENV === 'development') {
    readDirArray.push(SiteSettings.MARKDOWN_POSTS_PREVIEW_PATH);
  }

  // マークダウンファイルの読み込み
  let markdownDataArray: markdownPostMatterData[] = [];
  for (const readDir of readDirArray) {
    const filePathList = fs.readdirSync(readDir);
    const markdownData = filePathList
      .filter(
        (fileName) =>
          fileName.includes('.md') && !fileName.includes('_template'),
      )
      .map((fileName) => {
        // gray-matterでmeta情報とcontentを取得
        const filePath = `${readDir}/${fileName}`;
        const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
        return convertMarkdownPostMatterData(markdownWithMeta, filePath);
      });
    markdownDataArray = markdownDataArray.concat(markdownData);
  }

  // 指定の記事種別にフィルタ、作成日時降順で取得
  if (postType) {
    markdownDataArray = markdownDataArray.filter(
      (data) => data.meta.type == postType,
    );
  }
  markdownDataArray.sort((a, b) =>
    a.meta.post_date > b.meta.post_date ? 1 : -1,
  );

  // 記事データに変換して返却
  for (let i = 0; i < markdownDataArray.length; i++) {
    result.push(
      convertResponseMarkdownPostData(
        markdownDataArray[i],
        allCategories,
        allTags,
      ),
    );
  }

  return result;
}
