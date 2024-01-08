export class TitleAreaUtil {
  public static rootId: string = 'title-area';
  public static titleLogoImageId: string = 'title-logo-img';
  public static titleLoadingId: string = 'title-loading-img';
  public static titleLoadingFadeOutClassName: string = 'title-loading-fade-out';

  public static getSize(): { width: number; height: number } {
    return { width: this.width(), height: this.height() };
  }

  public static width(): number {
    return document.getElementById(this.rootId)?.clientWidth ?? 0;
  }

  public static height(): number {
    return document.getElementById(this.rootId)?.clientHeight ?? 0;
  }

  public static offsetTop(): number {
    return document.getElementById(this.rootId)?.offsetTop ?? 0;
  }
}
