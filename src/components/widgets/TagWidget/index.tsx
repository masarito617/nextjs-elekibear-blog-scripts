import { Theme, css } from '@emotion/react';
import { useRouter } from 'next/router';
import { BiSolidTag } from 'react-icons/bi';
import SideWidgetBase from '../WidgetBase';
import SiteSettings from 'settings/SiteSettings';
import { apiMst } from 'types/mst-api';

const styleRoot = css`
  display: flex;
  flex-wrap: wrap;
  padding: 4px 20px 20px 16px;
`;

const styleTag = (theme: Theme) => css`
  display: flex;
  align-items: center;
  position: relative;
  color: ${theme.colors.primaryWhite};
  border-radius: 4px;
  font-size: 10px;
  padding: 4px 8px 4px 2px;
  margin: 4px 4px 4px 0px;
  margin-right: 4px;
  opacity: 0.9;
  cursor: pointer;

  background-color: ${theme.colors.primaryDarkGray};
  :hover {
    background-color: ${theme.colors.primaryLightGray};
  }
`;
const styleTagIconWrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
`;

/**
 * タグウィジェット
 */
const TagWidget = (props: {
  tags: apiMst.Tag[];
  allPosts: apiMst.Post[];
  setTagStateAction?: (slug: string) => void;
}) => {
  // 選択されたカテゴリーをクエリパラメータに設定
  const router = useRouter();
  function SetTagUrlQuery(slug: string) {
    // カテゴリ指定のURLに遷移
    const encodeSlug = encodeURI(slug).toLowerCase();
    router.push(`/?${SiteSettings.UrlParamNameTag}=${encodeSlug}`, undefined, {
      shallow: true,
      scroll: true,
    });
    if (props.setTagStateAction) {
      props.setTagStateAction(encodeSlug);
    }
  }

  // 記事の件数順で並び替え
  const sortedTags = props.tags.sort((tagA, tagB) => {
    const tagACount = getTagSlugPostCount(tagA.slug, props.allPosts);
    const tagBCount = getTagSlugPostCount(tagB.slug, props.allPosts);
    if (tagACount < tagBCount) {
      return 1;
    }
    if (tagACount > tagBCount) {
      return -1;
    }
    return 0;
  });

  return (
    <SideWidgetBase title={'タグ'}>
      <div css={styleRoot}>
        {sortedTags.map((tag: apiMst.Tag) => {
          // 記事数が少ないタグは省く
          const tagPostCount = getTagSlugPostCount(tag.slug, props.allPosts);
          if (tagPostCount <= 1) {
            return <span key={tag.id}></span>;
          }
          return (
            <span
              key={tag.id}
              css={styleTag}
              onClick={() => {
                SetTagUrlQuery(tag.slug);
              }}
            >
              <span css={styleTagIconWrapper}>
                <BiSolidTag size={'0.8rem'}></BiSolidTag>
              </span>
              {tag.name} ({getTagSlugPostCount(tag.slug, props.allPosts)})
            </span>
          );
        })}
      </div>
    </SideWidgetBase>
  );
};
export default TagWidget;

/**
 * 該当タグの記事件数を返却する
 * @param tagSlug
 * @param allPosts
 * @returns
 */
function getTagSlugPostCount(tagSlug: string, allPosts: apiMst.Post[]): number {
  // 指定カテゴリのみにフィルタ
  if (tagSlug) {
    const filteredPosts = allPosts.filter((post) => {
      const tags = post.tags;
      const isContainTag = tags.some(
        (tag) =>
          encodeURI(tag.slug).toLowerCase() == encodeURI(tagSlug).toLowerCase(),
      );
      return isContainTag;
    });
    return filteredPosts.length;
  }
  return allPosts.length;
}
