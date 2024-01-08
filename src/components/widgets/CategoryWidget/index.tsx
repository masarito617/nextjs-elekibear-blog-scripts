import { css, Theme } from '@emotion/react';
import { useRouter } from 'next/router';
import SideWidgetBase from '../WidgetBase';
import SiteSettings from 'settings/SiteSettings';
import { md } from 'style/media';
import { apiMst } from 'types/mst-api';

const styleRoot = css`
  padding: 4px 20px 20px 16px;
`;

const styleParentCategory = (theme: Theme) => css`
  font-size: 14px;
  font-weight: bold;
  padding: 3px 0px;
  padding-top: 6px;
  color: ${theme.colors.primaryDarkGray};
  cursor: pointer;
  &:hover {
    background-color: rgba(34, 34, 34, 0.05);
  }

  ${md(css`
    padding: 2px 0px;
    padding-top: 3px;
    font-size: 12px;
  `)}
`;

const styleChildrenCategory = (theme: Theme) => css`
  font-weight: normal;
  font-size: 12px;
  padding: 3px 0px;
  padding-left: 12px;
  color: ${theme.colors.primaryLightGray};
  cursor: pointer;
  &:hover {
    background-color: rgba(34, 34, 34, 0.05);
  }

  ${md(css`
    padding: 2px 0px;
    padding-left: 12px;
    font-size: 10px;
  `)}
`;

/**
 * カテゴリーウィジェット
 * @param props
 * @returns
 */
const CategoryWidget = (props: {
  allCategories: apiMst.Categories;
  allCategoryIdIncludeChildInfo: apiMst.AllCategoryIdIncludeChildInfo;
  allPosts: apiMst.Post[];
  menuPathArray: string[];
  setCategoryStateAction?: (slug: string) => void;
}) => {
  // 選択されたカテゴリーをクエリパラメータに設定
  const router = useRouter();
  function SetCategoryUrlQuery(slug: string) {
    // カテゴリ指定のURLに遷移
    const encodeSlug = encodeURI(slug).toLowerCase();
    router.push(
      `/?${SiteSettings.UrlParamNameCateogry}=${encodeSlug}`,
      undefined,
      {
        shallow: true,
        scroll: true,
      },
    );
    if (props.setCategoryStateAction) {
      props.setCategoryStateAction(encodeSlug);
    }
  }

  // 親カテゴリ情報を取得
  const parentCategoryInfoArray = getParentCategoryInfoArray(
    props.allCategories,
    props.menuPathArray,
  );

  return (
    <SideWidgetBase title="カテゴリー">
      <div css={styleRoot}>
        {parentCategoryInfoArray.map((parentCategoryInfo: CategoryInfo) => {
          const childrenCategoryInfoArray =
            getChildrenCategoryInfoArrayForMenuPath(
              props.allCategories,
              props.menuPathArray,
              parentCategoryInfo.menuPath,
            );
          return (
            <div key={parentCategoryInfo.slug}>
              {/** 親カテゴリ */}
              <div
                css={styleParentCategory}
                onClick={() => SetCategoryUrlQuery(parentCategoryInfo.slug)}
              >
                {parentCategoryInfo.name} (
                {getCategorySlugPostCount(
                  parentCategoryInfo.slug,
                  props.allPosts,
                  props.allCategoryIdIncludeChildInfo,
                )}
                )
              </div>
              {/** 子カテゴリ */}
              {childrenCategoryInfoArray.map(
                (childrenCategoryInfo: CategoryInfo) => {
                  return (
                    <div
                      key={childrenCategoryInfo.slug}
                      css={styleChildrenCategory}
                      onClick={() =>
                        SetCategoryUrlQuery(childrenCategoryInfo.slug)
                      }
                    >
                      {childrenCategoryInfo.name} (
                      {getCategorySlugPostCount(
                        childrenCategoryInfo.slug,
                        props.allPosts,
                        props.allCategoryIdIncludeChildInfo,
                      )}
                      )
                    </div>
                  );
                },
              )}
            </div>
          );
        })}
      </div>
    </SideWidgetBase>
  );
};
export default CategoryWidget;

// カテゴリ情報
export interface CategoryInfo {
  menuPath: string; // パス
  name: string; // カテゴリ名
  slug: string; // スラッグ名
}

// 親カテゴリをキーとした子カテゴリ連想配列
export interface ChildrenCategoryInfoDictionary {
  [parentPath: string]: CategoryInfo[];
}

/**
 * 親カテゴリ情報の取得
 * @param allCategories 全てのカテゴリ情報
 * @param menuPathArray メニューパス配列
 * @returns 親カテゴリ情報
 */
function getParentCategoryInfoArray(
  allCategories: apiMst.Categories,
  menuPathArray: string[],
) {
  // 親カテゴリのパスのみにフィルタ
  const parentMenuPathArray = menuPathArray.filter((menuPath) => {
    return menuPath.split('/').length <= 2; // pathの長さが短いもの
  });
  // 名前も付与した情報配列を作成
  const parentCategoryInfoArray = [];
  for (let i = 0; i < parentMenuPathArray.length; i++) {
    const menuPath = parentMenuPathArray[i];
    parentCategoryInfoArray.push({
      menuPath: menuPath,
      name: getCategoryNameForMenuPath(allCategories, menuPath),
      slug: getCategorySlugForMenuPath(menuPath),
    });
  }
  return parentCategoryInfoArray;
}

/**
 * 子カテゴリ情報の取得
 * 親カテゴリのパスをキーとした辞書を作成
 * @param allCategories 全てのカテゴリ情報
 * @param menuPathArray メニューパス配列
 * @param parentPath 親カテゴリ情報
 * @returns 親カテゴリパスをキーとした子カテゴリ情報
 */
function getChildrenCategoryInfoArrayForMenuPath(
  allCategories: apiMst.Categories,
  menuPathArray: string[],
  parentPath: string,
) {
  const childrenCategoryInfoArray: CategoryInfo[] = [];
  for (let i = 0; i < menuPathArray.length; i++) {
    // 親カテゴリは除く
    const menuPathToken = menuPathArray[i].split('/');
    if (menuPathToken.length <= 2) {
      continue;
    }
    // 親カテゴリーに含まれる子カテゴリー情報を設定
    const parent = menuPathToken[1];
    if (parent == parentPath.replaceAll('/', '')) {
      const menuPath = menuPathArray[i];
      childrenCategoryInfoArray.push({
        menuPath: menuPath,
        name: getCategoryNameForMenuPath(allCategories, menuPath),
        slug: getCategorySlugForMenuPath(menuPath),
      });
    }
  }
  return childrenCategoryInfoArray;
}

/**
 * メニューパスからslugを取得
 * @param menuPath
 * @returns
 */
function getCategorySlugForMenuPath(menuPath: string) {
  // menuPath末尾からslugを取得
  const menuPathArray = menuPath.split('/');
  return menuPathArray[menuPathArray.length - 1];
}
/**
 * メニューパスからカテゴリ名を取得する
 * @param allCategories
 * @param menuPath
 * @returns
 */
function getCategoryNameForMenuPath(
  allCategories: apiMst.Categories,
  menuPath: string,
) {
  // menuPath末尾からslugを取得
  const categorySlug = getCategorySlugForMenuPath(menuPath);
  // カテゴリデータの中からカテゴリ名を探して返却
  const allCategoriesEdges = allCategories.categories;
  for (let i = 0; i < allCategoriesEdges.length; i++) {
    const category = allCategoriesEdges[i];
    if (category.slug == categorySlug) {
      return category.name;
    }
  }
  // 見つからなかった場合
  return '';
}

/**
 * 該当カテゴリーの記事件数を返却する
 * @param cateogorySlug
 * @param allPosts
 * @param allCategoryIdIncludeChildInfo
 * @returns
 */
function getCategorySlugPostCount(
  cateogorySlug: string,
  allPosts: apiMst.Post[],
  allCategoryIdIncludeChildInfo: apiMst.AllCategoryIdIncludeChildInfo,
): number {
  // 指定カテゴリのみにフィルタ
  if (cateogorySlug) {
    const categoryIdArray: string[] =
      allCategoryIdIncludeChildInfo[encodeURI(cateogorySlug).toLowerCase()]
        .categoryIds;
    if (categoryIdArray) {
      const filteredPosts = allPosts.filter((post) => {
        const categories = post.categories;
        const isContainCategory = categories.some((category) =>
          categoryIdArray.includes(category.id.toString()),
        );
        return isContainCategory;
      });
      return filteredPosts.length;
    }
  }
  return allPosts.length;
}
