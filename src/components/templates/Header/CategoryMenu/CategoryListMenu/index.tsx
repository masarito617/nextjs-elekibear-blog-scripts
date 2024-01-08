import { Theme, css } from '@emotion/react';
import { CategoryInfo, ChildrenCategoryInfoDictionary } from '..';
import { lg } from 'style/media';

const styleCategorySubMenuRoot = (theme: Theme) => css`
  position: absolute;
  left: -30px; // 子160/2 - 親100/2 (無理やりだが
  width: 160px;
  list-style-type: none;
  z-index: ${theme.zindex.categorySubMenu}; // 一番前面に出す

  padding-inline-start: 0px;
  li:last-child {
    border-radius: 0px 0px 10px 10px;
  }
`;

const styleCategorySubMenuItem = (theme: Theme) => css`
  height: 40px;
  text-align: center;
  padding: 0px;

  background-color: ${theme.colors.primaryDarkGray};
  :hover {
    background-color: ${theme.colors.primaryLightGray};
  }
`;

const styleCategorySubMenuItemLink = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0px 12px;
  text-decoration: none;

  color: ${theme.colors.primaryWhite};
  :hover {
    color: ${theme.colors.primaryYellow};
  }
`;

/**
 * カテゴリサブメニュー
 * @returns
 */
const CategoryListSubMenu = (props: {
  categoryInfoArray: CategoryInfo[];
  setCategoryUrlQuery?: (slug: string) => void;
}) => {
  return (
    <ul css={styleCategorySubMenuRoot}>
      {props.categoryInfoArray.map((categoryInfo) => (
        <li key={categoryInfo.menuPath} css={styleCategorySubMenuItem}>
          <div
            css={styleCategorySubMenuItemLink}
            onClick={() => {
              if (props.setCategoryUrlQuery) {
                props.setCategoryUrlQuery(categoryInfo.slug);
              }
            }}
          >
            {categoryInfo.name}
          </div>
        </li>
      ))}
    </ul>
  );
};

const styleCategoryManuRoot = (theme: Theme) => css`
  display: flex;
  gap: 2px;
  list-style-type: none;
  background-color: ${theme.colors.primaryDarkGray}; // TODO あとで消す

  // ハンバーガーメニューと切り替えるため
  ${lg(css`
    display: none;
  `)}
`;

const styleCategoryManuItem = (theme: Theme) => css`
  position: relative;
  text-decoration: none;
  height: 40px;
  width: 100px;
  text-align: center;

  // ホバー時にサブメニューを表示する
  ul {
    display: none;
  }
  :hover ul {
    display: block;
  }
`;

const styleCategoryMenuItemArrow = css`
  content: '';
  float: left;
  display: block;
  width: 4px;
  height: 4px;
  border-top: #fff 2px solid;
  border-right: #fff 2px solid;
  -webkit-transform: rotate(135deg);
  -ms-transform: rotate(135deg);
  transform: rotate(135deg);
  position: absolute;
  right: 8px;
  top: 4px;
  bottom: 15%;
  margin: auto;
`;

const styleCategoryMenuItemLink = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  font-size: 12px;
  text-decoration: none;

  color: ${theme.colors.primaryWhite};
  background-color: ${theme.colors.primaryDarkGray};
  :hover {
    color: ${theme.colors.primaryYellow};
    background-color: ${theme.colors.primaryLightGray};
  }
`;

/**
 * カテゴリーリストメニュー
 * @param props
 * @returns
 */
const CategoryListMenu = (props: {
  parentCategoryInfoArray: CategoryInfo[];
  childrenCategoryInfoArrayDictionary: ChildrenCategoryInfoDictionary;
  setCategoryUrlQuery?: (slug: string) => void;
}) => {
  return (
    <>
      <ul css={styleCategoryManuRoot}>
        {props.parentCategoryInfoArray.map((categoryInfo) => {
          const childrenCategoryInfoArray =
            props.childrenCategoryInfoArrayDictionary[categoryInfo.menuPath];
          return (
            <li key={categoryInfo.menuPath} css={styleCategoryManuItem}>
              {/** 折りたたみマーク */}
              {childrenCategoryInfoArray.length > 0 ? (
                <span css={styleCategoryMenuItemArrow}></span>
              ) : (
                <></>
              )}
              {/** 親カテゴリメニュー */}
              <div
                css={styleCategoryMenuItemLink}
                onClick={() => {
                  if (props.setCategoryUrlQuery) {
                    props.setCategoryUrlQuery(categoryInfo.slug);
                  }
                }}
              >
                {categoryInfo.name}
              </div>
              {/** サブメニュー */}
              <CategoryListSubMenu
                categoryInfoArray={childrenCategoryInfoArray}
                setCategoryUrlQuery={props.setCategoryUrlQuery}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default CategoryListMenu;
