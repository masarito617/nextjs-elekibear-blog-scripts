import { css } from '@emotion/react';
import { BiSearch, BiSolidTag } from 'react-icons/bi';
import Breadcrumb from 'components/common/Breadcrumb';
import BreadcrumbItem from 'components/common/Breadcrumb/BreadcrumbItem';
import { apiMst } from 'types/mst-api';

const styleIconWrapper = css`
  position: relative;
  width: 12px;
  margin-right: 16px;
`;

const styleIcon = css`
  position: absolute;
  top: 2px;
`;

/**
 * パンくずリスト (記事一覧画面用)
 * あまりにも大きくなったのでコンポーネントとして分割
 * @param props
 * @returns
 */
const BreadcrumbItems = (props: {
  searchWord: string;
  setSearchWordState: (searchWord: string) => void;
  categorySlug: string;
  allCategories: apiMst.Categories;
  setCategoryState: (slug: string) => void;
  tagSlug: string;
  allTags: apiMst.Tags;
  setTagState: (slug: string) => void;
}) => {
  // 検索 -> カテゴリ -> タグ の優先順で表示
  const searchWord = props.searchWord;
  const categorySlug = props.categorySlug;
  const tagSlug = props.tagSlug;

  // 検索ワード指定されている場合
  if (searchWord) {
    return (
      <Breadcrumb>
        <BreadcrumbItem
          href="/"
          isHome={true}
          onClick={() => props.setSearchWordState('')}
        >
          ホーム
        </BreadcrumbItem>
        <BreadcrumbItem
          href={'/'}
          query={{
            search: searchWord,
          }}
          onClick={() => props.setSearchWordState(searchWord)}
        >
          <span css={styleIconWrapper}>
            <BiSearch css={styleIcon} size={'0.8rem'} />
          </span>
          {decodeURI(searchWord)}
        </BreadcrumbItem>
      </Breadcrumb>
    );
  }

  // カテゴリー指定されている場合
  if (categorySlug) {
    const targetCategorySlugArray = [categorySlug];

    // 親のslugがあれば追加する
    for (let i = 0; i < props.allCategories.categories.length; i++) {
      const checkCategory = props.allCategories.categories[i];
      if (checkCategory.children != null && checkCategory.children.length > 0) {
        const isContainChild = checkCategory.children.some(
          (childCategory) =>
            encodeURI(childCategory.slug).toLowerCase() == categorySlug,
        );
        if (isContainChild) {
          targetCategorySlugArray.unshift(checkCategory.slug);
        }
      }
    }

    return (
      <Breadcrumb>
        <BreadcrumbItem
          href="/"
          isHome={true}
          onClick={() => props.setCategoryState('')}
        >
          ホーム
        </BreadcrumbItem>
        {targetCategorySlugArray.map((categorySlug: string) => (
          <BreadcrumbItem
            key={categorySlug}
            href={'/'}
            query={{
              category: categorySlug,
            }}
            onClick={() => props.setCategoryState(categorySlug)}
          >
            {
              props.allCategories.categories.find(
                (category) =>
                  encodeURI(category.slug).toLowerCase() == categorySlug,
              )?.name
            }
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    );
  }

  // タグ指定されている場合
  if (tagSlug) {
    return (
      <Breadcrumb>
        <BreadcrumbItem
          href="/"
          isHome={true}
          onClick={() => props.setTagState('')}
        >
          ホーム
        </BreadcrumbItem>
        <BreadcrumbItem
          href={'/'}
          query={{
            tag: tagSlug,
          }}
          onClick={() => props.setTagState(tagSlug)}
        >
          <span css={styleIconWrapper}>
            <BiSolidTag css={styleIcon} size={'0.8rem'} />
          </span>
          {
            props.allTags.tags.find(
              (tag) => encodeURI(tag.slug).toLowerCase() == tagSlug,
            )?.name
          }
        </BreadcrumbItem>
      </Breadcrumb>
    );
  }

  return <Breadcrumb></Breadcrumb>;
};
export default BreadcrumbItems;
