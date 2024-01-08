import { Theme, css, useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';
import { md, sm } from 'style/media';

const styleRoot = (theme: Theme, isActive: boolean) => css`
  position: fixed;
  right: 50px;
  bottom: 50px;

  height: 100px;
  width: 100px;
  border-radius: 80px;
  border: 1px solid ${theme.colors.primaryWhite};
  box-shadow: 4px 6px 8px 2px rgba(0, 0, 0, 0.3);
  cursor: pointer;

  background-color: ${theme.colors.primaryDarkGray};
  color: ${theme.colors.primaryWhite};
  font-size: 20px;

  opacity: ${isActive ? 0.9 : 0};
  transition: 0.2s;
  pointer-events: ${isActive ? '' : 'none'};

  ${md(css`
    right: 18px;
    bottom: 18px;
  `)}
  ${sm(css`
    height: 80px;
    width: 80px;
    font-size: 18px;
  `)}
`;

const styleArrow = () => css`
  position: absolute;
  top: 14px;
  left: 32px;
  font-size: 32px;

  ${sm(css`
    top: 10px;
    left: 25px;
    font-size: 28px;
  `)}
`;

/**
 * ボタンを表示させる高さ
 */
const ShowButtonHeight = 5000;

/**
 * ページTOPボタン
 * @returns
 */
const ScrollTopButton = () => {
  const theme = useTheme();
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', scrollWindow);
    return () => {
      window.removeEventListener('scroll', scrollWindow);
    };
  }, []);

  const scrollWindow = () => {
    let scroll = 0;
    scroll = window.scrollY;
    if (ShowButtonHeight <= scroll) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  };

  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button css={[styleRoot(theme, isButtonActive)]} onClick={returnTop}>
      <span>TOP</span>
      <span css={styleArrow}>＾</span>
    </button>
  );
};
export default ScrollTopButton;
