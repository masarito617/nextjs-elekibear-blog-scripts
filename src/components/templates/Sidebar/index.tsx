import { Theme, css } from '@emotion/react';
import { lg, xl } from 'style/media';

const styleRoot = css`
  padding: 0 1.5%;
  margin: 34px 0.5% 0.5% 0px;
  width: 400px;
  ${xl(css`
    width: 30%;
  `)}
  ${lg(css`
    display: block;
    width: auto;
    margin: 10px 4px;
  `)};
`;

/**
 * サイドバー
 * @param props
 * @returns
 */
const Sidebar = (props: { sideBarContent: React.ReactNode }) => {
  return <div css={styleRoot}>{props.sideBarContent}</div>;
};
export default Sidebar;
