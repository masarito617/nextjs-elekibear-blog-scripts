import { Theme, css, keyframes } from '@emotion/react';
import React from 'react';
import { md } from 'style/media';

const fadeInKeyframes = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 100;
  }
`;

const styleBreadcrumbRoot = (theme: Theme) => css`
  list-style: none;
  padding: 0px 0px 14px 36px;
  margin: 0px;
  height: 20px;
  animation: ${fadeInKeyframes} 0.7s ease 0s 1 normal;

  ${md(css`
    padding: 0px 0px 8px 6px;
  `)}
`;

/**
 * ぱんクズリスト
 * @param props
 * @returns
 */
const Breadcrumb = (props: { children?: React.ReactNode }) => {
  return <ol css={styleBreadcrumbRoot}>{props.children}</ol>;
};
export default Breadcrumb;
