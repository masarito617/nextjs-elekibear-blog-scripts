/**
 * Element操作関連
 */
export class ElementUtil {
  // 指定IDのElementを削除
  public static removeById(id: string) {
    const removeElem = document.querySelector('#' + id);
    if (removeElem) {
      removeElem.remove();
    }
  }

  // Element表示
  public static showById(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = 'block';
    }
  }

  // Element非表示
  public static hideById(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = 'none';
    }
  }

  // Class追加
  public static addClassById(id: string, className: string) {
    const element = document.getElementById(id);
    if (element) {
      element.classList.add(className);
    }
  }

  // scriptタグを作成して追加
  public static appendScript(
    url: string,
    id: string,
    isAsync: boolean,
    onLoad: () => void = () => {},
  ) {
    const elem = document.createElement('script');
    elem.id = id;
    elem.onload = () => {};
    elem.onerror = () => {};
    if (isAsync) {
      elem.async = true;
    }
    elem.src = url;
    if (onLoad != null) {
      elem.onload = onLoad;
    }
    document.body.append(elem);
  }
}
