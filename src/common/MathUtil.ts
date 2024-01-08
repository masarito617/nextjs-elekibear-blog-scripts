/**
 * 数学関連
 */
export class MathUtil {
  // イーズイン
  public static easeInQuad(t: number) {
    return t * t;
  }
  // イーズアウト
  public static easeOutQuad(t: number) {
    return t * (2 - t);
  }
  public static easeOutQuart(t: number): number {
    return 1 - Math.pow(1 - t, 4);
  }
  // 指定範囲の乱数を取得
  public static getRandom(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
