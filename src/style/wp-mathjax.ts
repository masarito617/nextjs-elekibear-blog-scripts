import { Theme, css } from '@emotion/react';

export const styleWpMathJax = (theme: Theme) => css`
  ${styleMathJaxCustom}
`;

// 自身での追加カスタム
const styleMathJaxCustom = css`
  // ver3で改行が効かない事象が発生
  // mjx-mspaceタグに変換されているようなので無理やり改行
  mjx-mspace {
    display: block !important;
    margin-bottom: 8px !important;
  }
`;
