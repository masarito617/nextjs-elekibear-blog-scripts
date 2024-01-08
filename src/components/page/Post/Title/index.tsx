import { css } from '@emotion/react';
import { md, sm } from 'style/media';

/**
 * 記事ページ タイトル
 * @param props
 * @returns
 */
const Title = (props: { title: string }) => {
  const styleContentTitle = css`
    font-size: 24px;
    line-height: 132%;

    ${md(css`
      font-size: 20px;
    `)}
    ${sm(css`
      font-size: 16px;
    `)}
  `;
  return <h1 css={styleContentTitle}>{props.title}</h1>;
};
export default Title;
