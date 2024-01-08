import { Theme, css } from '@emotion/react';
import { md, sm } from 'style/media';

const styleRoot = (theme: Theme) => css`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.primaryDarkGray};
  box-shadow: 0px -12px 12px ${theme.colors.primaryDarkGray};
  margin-top: 20px;
`;

const styleContent = (theme: Theme) => css`
  margin: auto;
  color: ${theme.colors.primaryYellow};
  font-size: 14px;

  ${md(css`
    font-size: 12px;
  `)}
  ${sm(css`
    font-size: 10px;
  `)}
`;

/**
 * フッター
 * @returns
 */
const Footer = () => {
  return (
    <footer css={styleRoot}>
      <div css={styleContent}>
        copyright ©︎ 2019-2023 都会のエレキベア All Rights Reserved.
      </div>
    </footer>
  );
};
export default Footer;
