import { Theme, css } from '@emotion/react';
import { useRouter } from 'next/router';
import { BiSolidTime, BiSolidTag } from 'react-icons/bi';
import SiteSettings from 'settings/SiteSettings';
import { md } from 'style/media';
import { apiMst } from 'types/mst-api';

const styleRoot = css`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

/** カテゴリ、タグのWrapper */
const styleTermsWrapper = css`
  display: flex;
  flex-wrap: wrap;
  width: 70%;
`;

/** カテゴリ */
const styleCategory = (theme: Theme) => css`
  display: flex;
  align-items: center;
  color: ${theme.colors.primaryYellow};
  border-radius: 20px;
  font-size: 13px;
  padding: 4px 14px;
  margin: 2px 4px 2px 0px;
  opacity: 0.9;
  cursor: pointer;

  background-color: ${theme.colors.primaryDarkGray};
  :hover {
    background-color: ${theme.colors.primaryLightGray};
  }

  ${md(css`
    font-size: 10px;
    padding: 3px 10px;
    margin: 4px 3px 4px 0px;
  `)}
`;

/** タグ */
const styleTag = (theme: Theme) => css`
  display: flex;
  align-items: center;
  position: relative;
  color: ${theme.colors.primaryWhite};
  border-radius: 4px;
  font-size: 12px;
  padding: 4px 8px 4px 2px;
  margin: 4px 4px 4px 0px;
  margin-right: 4px;
  opacity: 0.9;
  cursor: pointer;

  background-color: ${theme.colors.primaryDarkGray};
  :hover {
    background-color: ${theme.colors.primaryLightGray};
  }

  ${md(css`
    font-size: 9px;
    padding: 3px 6px 3px 0px;
    margin: 5px 3px 5px 0px;
  `)}
`;
const styleTagIconWrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  ${md(css`
    /* top: 4px;
    left: 5px; */
    padding-left: 2px;
    width: 20px;
  `)}
`;

/** 日付 */
const styleDate = (theme: Theme) => css`
  position: absolute;
  bottom: 2px;
  right: 8px;
  text-align: right;
  line-height: 1;
  font-size: 14px;
  color: ${theme.colors.primaryDarkGray};

  ${md(css`
    font-size: 10px;
  `)}
`;
const styleDateIconWrapper = css`
  position: absolute;
  top: 1px;
  left: -18px;

  ${md(css`
    top: -1px;
    left: -13px;
  `)}
`;

/**
 * 記事ページ 記事情報欄
 * @param props
 * @returns
 */
const PostInfo = (props: { post: apiMst.Post }) => {
  const router = useRouter();
  // カテゴリ押下時の遷移
  function SetCategoryUrlQuery(slug: string) {
    const encodeSlug = encodeURI(slug).toLowerCase();
    router.push(
      `/?${SiteSettings.UrlParamNameCateogry}=${encodeSlug}`,
      undefined,
      {
        shallow: true,
        scroll: true,
      },
    );
  }
  // タグ押下時の遷移
  function SetTagUrlQuery(slug: string) {
    const encodeSlug = encodeURI(slug).toLowerCase();
    router.push(`/?${SiteSettings.UrlParamNameTag}=${encodeSlug}`, undefined, {
      shallow: true,
      scroll: true,
    });
  }

  const post: apiMst.Post = props.post;
  return (
    <div css={styleRoot}>
      <div css={styleTermsWrapper}>
        {post.categories.map((category) => (
          <span
            key={category.name}
            css={styleCategory}
            onClick={() => {
              SetCategoryUrlQuery(category.slug);
            }}
          >
            {category.name}
          </span>
        ))}
        {post.tags.map((tag) => (
          <span
            key={tag.name}
            css={styleTag}
            onClick={() => {
              SetTagUrlQuery(tag.slug);
            }}
          >
            <span css={styleTagIconWrapper}>
              <BiSolidTag size={'0.8rem'}></BiSolidTag>
            </span>
            {tag.name}
          </span>
        ))}
      </div>
      <div css={styleDate}>
        <span css={styleDateIconWrapper}>
          <BiSolidTime size={'0.7rem'} />
        </span>
        {post.date.substring(0, 10)}
      </div>
    </div>
  );
};
export default PostInfo;
