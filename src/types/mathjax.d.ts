// types/mathjax はver2までしかサポートされていなかったため自前で定義
declare namespace MathJax {
  export const typesetPromise: () => void;
}
