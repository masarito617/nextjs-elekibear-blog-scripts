import fs from 'fs';

export class FileUtil {
  /**
   * ファイル読込処理
   * 読み込めなければ空文字を返す
   * @param filePath
   * @returns
   */
  public static tryReadFileSync(filePath: string): string {
    let result: string = '';
    try {
      result = fs.readFileSync(filePath, 'utf-8');
    } catch {
      result = '';
    }
    return result;
  }
}
