import { Global, Theme, css, keyframes } from '@emotion/react';
import { useEffect, useState } from 'react';
import { CategoryInfo, ChildrenCategoryInfoDictionary } from '..';
import { lg, sm } from 'style/media';

// ハンバーガーメニュー 三ボタン状態
const styleHumburgerMenuOpenButtonTop = css`
  bottom: 8px;
  transform: rotate(0deg);
`;
const styleHumburgerMenuOpenButtonMiddle = css`
  background-color: #ffffff;
`;
const styleHumburgerMenuOpenButtonBottom = css`
  top: 8px;
  transform: rotate(0deg);
`;

// ハンバーガーメニュー ×ボタン状態
const styleHumburgerMenuCloseButtonTop = css`
  bottom: 0px;
  transform: rotate(45deg);
`;
const styleHumburgerMenuCloseButtonMiddle = css`
  background-color: rgba(255, 255, 255, 0);
`;
const styleHumburgerMenuCloseButtonBottom = css`
  top: 0px;
  transform: rotate(-45deg);
`;

// ハンバーガーメニュー 三ボタン => ×ボタン へのキーフレーム
const keyframesHumburgerOpenToCloseTop = keyframes`
  0% {
    ${styleHumburgerMenuOpenButtonTop};
  }
  100% {
    ${styleHumburgerMenuCloseButtonTop};
  }
`;
const keyframesHumburgerOpenToCloseMiddle = keyframes`
  0% {
    ${styleHumburgerMenuOpenButtonMiddle};
  }
  100% {
    ${styleHumburgerMenuCloseButtonMiddle};
  }
`;
const keyframesHumburgerOpenToCloseBottom = keyframes`
  0% {
    ${styleHumburgerMenuOpenButtonBottom};
  }
  100% {
    ${styleHumburgerMenuCloseButtonBottom};
  }
`;

// Class名
const HAMBURGER_OPEN_ANIMATION_CLASS = 'hamburger-open-animation';
const HAMBURGER_CLOSE_ANIMATION_CLASS = 'hamburger-close-animation';

const styleGlobal = css`
  // サブメニュー表示
  #hamburger-menu-check:checked ~ #hamburger-sub-menu {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
  }
  // ハンバーガーメニュー アニメーション
  // アニメーション終了後に削除、付与しなおすことで再度再生する
  .${HAMBURGER_OPEN_ANIMATION_CLASS} {
    span {
      animation-name: ${keyframesHumburgerOpenToCloseMiddle};
      animation-direction: reverse;
    }
    span::before {
      animation-name: ${keyframesHumburgerOpenToCloseTop};
      animation-direction: reverse;
    }
    span::after {
      animation-name: ${keyframesHumburgerOpenToCloseBottom};
      animation-direction: reverse;
    }
  }
  .${HAMBURGER_CLOSE_ANIMATION_CLASS} {
    span {
      animation-name: ${keyframesHumburgerOpenToCloseMiddle};
      animation-direction: normal;
    }
    span::before {
      animation-name: ${keyframesHumburgerOpenToCloseTop};
      animation-direction: normal;
    }
    span::after {
      animation-name: ${keyframesHumburgerOpenToCloseBottom};
      animation-direction: normal;
    }
  }
`;

const styleHumburgerMenuRoot = css`
  // カテゴリーリストメニューと切り替えるため
  display: none;
  ${lg(css`
    display: block;
  `)}
`;

const styleHamburgerMenuButton = (theme: Theme) => css`
  position: fixed;
  top: 10px;
  right: 10px;
  display: flex;
  height: 28px;
  width: 28px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: ${theme.zindex.humburgerMenuButton};

  // 線三本分の定義
  span,
  span::before,
  span::after {
    content: '';
    display: block;
    height: 4px;
    width: 25px;
    border-radius: 8px;
    background-color: #ffffff;
    position: absolute;

    // アニメーション共通
    animation-duration: 0.15s;
    animation-fill-mode: forwards;
    animation-timing-function: ease;
  }
`;

// ハンバーガーメニュー 三ボタン
const styleHamburgerMenuOpenButton = (theme: Theme) => css`
  ${styleHamburgerMenuButton(theme)};
  span {
    ${styleHumburgerMenuOpenButtonMiddle};
  }
  span::before {
    ${styleHumburgerMenuOpenButtonTop}
  }
  span::after {
    ${styleHumburgerMenuOpenButtonBottom}
  }
`;

// ハンバーガーメニュー ×ボタン
const styleHamburgerMenuCloseButton = (theme: Theme) => css`
  ${styleHamburgerMenuButton(theme)};
  span {
    ${styleHumburgerMenuCloseButtonMiddle};
  }
  span::before {
    ${styleHumburgerMenuCloseButtonTop};
  }
  span::after {
    ${styleHumburgerMenuCloseButtonBottom};
  }
`;

const styleHumburgerSubMenuRoot = (theme: Theme) => css`
  display: none; // 最初は非表示
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);

  // 画面いっぱいに広げる
  width: 100vw;
  min-height: 100vh;
  min-height: 100dvh;
  box-sizing: border-box;
  margin: 0 calc(50% - 50vw);

  // スクロール設定
  // スクロールチェインを回避
  overflow-x: hidden;
  overflow-y: scroll;
  overscroll-behavior-y: contain;

  z-index: ${theme.zindex.humburgerSubMenu};
`;

const styleHumburgerSubMenuItemWrapper = css`
  height: 100%;
  margin-top: 200px;
  margin-bottom: 100px;
`;

const styleHumburgerSubMenuItem = css`
  font-size: 20px;
  line-height: 20px;
  ${sm(css`
    font-size: 16px;
    line-height: 16px;
  `)}

  padding: 8px 0px;
`;

const styleHumburgerSubMenuParentItem = css`
  ${styleHumburgerSubMenuItem}
  margin-top: 16px;
`;

const styleHumburgerSubMenuChildrenItem = css`
  ${styleHumburgerSubMenuItem}
  margin-left: 12px;
  &::before {
    content: '-';
    margin-right: 8px;
  }
`;

const styleHumburgerSubMenuItemLink = (theme: Theme) => css`
  text-decoration: none;
  cursor: pointer;
  color: ${theme.colors.primaryWhite};
  :hover {
    color: ${theme.colors.primaryYellow};
  }
`;

/**
 * カテゴリーハンバーガーサブメニュー
 * 全画面に半透明の背景を敷いてメニューを表示する
 * @param props
 * @returns
 */
const CategoryHumburgerSubMenu = (props: {
  parentCategoryInfoArray: CategoryInfo[];
  childrenCategoryInfoArrayDictionary: ChildrenCategoryInfoDictionary;
  setCategoryUrlQuery?: (slug: string) => void;
}) => {
  return (
    <div id="hamburger-sub-menu" css={styleHumburgerSubMenuRoot}>
      <div css={styleHumburgerSubMenuItemWrapper}>
        {props.parentCategoryInfoArray.map((categoryInfo) => {
          const childrenCategoryInfoArray =
            props.childrenCategoryInfoArrayDictionary[categoryInfo.menuPath];
          return (
            <div key={'humburger_' + categoryInfo.slug}>
              <div
                css={styleHumburgerSubMenuItemLink}
                onClick={() => {
                  if (props.setCategoryUrlQuery) {
                    props.setCategoryUrlQuery(categoryInfo.slug);
                  }
                }}
              >
                <div css={styleHumburgerSubMenuParentItem}>
                  {categoryInfo.name}
                </div>
              </div>
              {childrenCategoryInfoArray.map((childCategoryInfo) => (
                <div
                  key={'humburger_' + childCategoryInfo.slug}
                  css={styleHumburgerSubMenuItemLink}
                  onClick={() => {
                    if (props.setCategoryUrlQuery) {
                      props.setCategoryUrlQuery(childCategoryInfo.slug);
                    }
                  }}
                >
                  <div css={styleHumburgerSubMenuChildrenItem}>
                    {childCategoryInfo.name}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ID名
const HAMBURGER_MENU_BUTTON_ID = 'hamburger-menu-button';
const HAMBURGER_MENU_CHECK_BOX_ID = 'hamburger-menu-check';

/**
 * カテゴリーハンバーガーメニュー
 * 参考: https://www.asobou.co.jp/blog/web/css-menu
 * @param props
 * @returns
 */
const CategoryHumburgerMenu = (props: {
  parentCategoryInfoArray: CategoryInfo[];
  childrenCategoryInfoArrayDictionary: ChildrenCategoryInfoDictionary;
  setCategoryUrlQuery?: (slug: string) => void;
}) => {
  const [isChecked, setIsChecked] = useState(false);

  // カテゴリ設定処理にウィンドウを閉じる処理も追加
  function SetCategoryUrlQueryWithClose(slug: string) {
    setIsChecked(false);
    if (props.setCategoryUrlQuery) {
      props.setCategoryUrlQuery(slug);
    }
  }

  // checkedが更新された時
  useEffect(() => {
    const button = document.getElementById(HAMBURGER_MENU_BUTTON_ID);
    if (button == null) {
      return;
    }
    // アニメーションクラスを付与
    button.classList.add(
      isChecked
        ? HAMBURGER_CLOSE_ANIMATION_CLASS
        : HAMBURGER_OPEN_ANIMATION_CLASS,
    );
  }, [isChecked]);

  // 初回表示
  useEffect(() => {
    const button = document.getElementById(HAMBURGER_MENU_BUTTON_ID);
    if (button == null) {
      return;
    }
    // アニメーション終了時にクラスを削除
    button.addEventListener('animationend', () => {
      button.classList.remove(HAMBURGER_OPEN_ANIMATION_CLASS);
      button.classList.remove(HAMBURGER_CLOSE_ANIMATION_CLASS);
    });
    // 初回はクラスを削除しておく
    button.classList.remove(HAMBURGER_OPEN_ANIMATION_CLASS);
  }, []);

  return (
    <>
      <Global styles={styleGlobal} />
      <div css={styleHumburgerMenuRoot}>
        {/** checkboxの状態をstateに反映 */}
        <input
          type="checkbox"
          id={HAMBURGER_MENU_CHECK_BOX_ID}
          css={css`
            display: none;
          `}
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        {/** checkboxの状態でハンバーガーボタンのスタイルを切り替える */}
        <label
          id={HAMBURGER_MENU_BUTTON_ID}
          htmlFor={HAMBURGER_MENU_CHECK_BOX_ID}
          css={
            isChecked
              ? styleHamburgerMenuCloseButton
              : styleHamburgerMenuOpenButton
          }
        >
          <span></span>
        </label>
        <CategoryHumburgerSubMenu
          parentCategoryInfoArray={props.parentCategoryInfoArray}
          childrenCategoryInfoArrayDictionary={
            props.childrenCategoryInfoArrayDictionary
          }
          setCategoryUrlQuery={SetCategoryUrlQueryWithClose}
        />
      </div>
    </>
  );
};
export default CategoryHumburgerMenu;
