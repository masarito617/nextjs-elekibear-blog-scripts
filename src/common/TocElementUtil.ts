/**
 * 目次要素共通処理
 */
export class TocElementUtil {
  /**
   * 目次要素に必要な情報を抽出
   * @param tocContents
   * @returns
   */
  public static getTocElementInfoArray(
    tocContents: TocContent[],
  ): TocElementInfo[] {
    const tocElementInfoArray: TocElementInfo[] = [];

    // 階層を調べるため、目次コンテンツに含まれる全てのhタグのリストを作成しておく
    let allHeadTagArray: string[] = [];
    tocContents.map((tocContent) => allHeadTagArray.push(tocContent.tag));
    allHeadTagArray = Array.from(new Set(allHeadTagArray));
    allHeadTagArray.sort();

    // 項目ごとのNo
    const contentNoDic: { [tag: string]: number } = {};

    let prevTocTag = tocContents[0].tag;
    tocContents.map((tocContent, index) => {
      if (!contentNoDic[tocContent.tag]) {
        contentNoDic[tocContent.tag] = 0;
      }
      // 前のタグの方が大きければリセット (h1->h2、h2->h4)
      if (
        tocContent.tag != prevTocTag &&
        this.getHeadTagDepth(tocContent.tag) > this.getHeadTagDepth(prevTocTag)
      ) {
        contentNoDic[tocContent.tag] = 0;
      }
      // Noをインクリメント
      contentNoDic[tocContent.tag]++;
      prevTocTag = tocContent.tag;

      // 調べた情報から設定
      const indent = allHeadTagArray.indexOf(tocContent.tag);
      const prefixNo = contentNoDic[tocContent.tag];
      tocElementInfoArray.push({
        prefixNo: prefixNo,
        indent: indent,
      });
    });
    return tocElementInfoArray;
  }

  /**
   * hタグの階層を返却する
   * 例: h1->1 h3->3
   * @param value
   * @returns
   */
  private static getHeadTagDepth(value: string): number {
    return Number(value.substring(1));
  }
}

/**
 * 目次要素に必要な情報
 */
export type TocElementInfo = {
  prefixNo: number; // 目次要素のNo
  indent: number; // 目次要素のインデント
};

/**
 * 目次要素の型情報
 */
export type TocContent = {
  id: string; // 要素のID
  title: string; // タイトル
  tag: string; // タグ(h2-h6など)
};
