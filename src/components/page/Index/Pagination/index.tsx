import { SerializedStyles, Theme, css } from '@emotion/react';
import { useRouter } from 'next/router';
import { BiFirstPage, BiLastPage } from 'react-icons/bi';
import SiteSettings from 'settings/SiteSettings';

const styleRoot = css`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  margin-bottom: 40px;
`;

const stylePageBase: SerializedStyles = css`
  width: 16px;
  height: 16px;
  margin: 0px 10px;
`;

const stylePageDisplay = (theme: Theme) => css`
  ${stylePageBase}
  color: ${theme.colors.primaryWhite};
  cursor: pointer;
  text-decoration: none;
`;

const stylePageSelected = (theme: Theme) => css`
  ${stylePageBase}
  color: ${theme.colors.primaryYellow};
  font-weight: bold;
`;

const stylePageMoveIcon = (theme: Theme) => css`
  color: ${theme.colors.primaryWhite};
`;

type PaginationProps = {
  displayPostCount: number; // 表示する投稿数
  totalPostCount: number; // 全ての投稿数
  currentPage: number; // 現在のページ数
  urlPathPrefix?: string; // URLパスに付与するPrefix
  setPageStateAction: (page: number) => void; // ページ状態設定
};

/**
 * ページネーション
 * @param props
 * @returns
 */
const Pagination = (props: PaginationProps) => {
  // shallow: ページをロードせずに遷移させる
  // scroll: ページトップにスクロールさせる
  // https://zenn.dev/sak/articles/fa88580b133b24431303
  const router = useRouter();
  function Paginate(page: number) {
    let url = `/?`;
    // カテゴリ指定されている場合
    const paramCategory = new URL(window.location.href).searchParams.get(
      SiteSettings.UrlParamNameCateogry,
    );
    if (paramCategory) {
      url += `${SiteSettings.UrlParamNameCateogry}=${paramCategory}&`;
    }
    // ページ数を指定して遷移
    url += `${SiteSettings.UrlParamNamePage}=${page}`;
    router.push(url, undefined, {
      shallow: true,
      scroll: true,
    });
    props.setPageStateAction(page);
  }

  // ページ数の配列を生成
  const firstPage = 1;
  const lastPage = Math.ceil(props.totalPostCount / props.displayPostCount);
  const pageNumbers = [];
  for (let i = firstPage; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  const prevPage = Math.max(1, props.currentPage - 1);
  const nextPage = Math.min(props.totalPostCount, props.currentPage + 1);

  return (
    <div css={styleRoot}>
      {/** 最初のページへ */}
      {(() => {
        if (firstPage != props.currentPage) {
          return (
            <div css={stylePageDisplay} onClick={() => Paginate(firstPage)}>
              <BiFirstPage css={stylePageMoveIcon} size={'1.2em'} />
            </div>
          );
        }
      })()}
      {/** 各ページ数 */}
      {pageNumbers.map((number) => {
        // 選択ページの前後2つまで表示する
        const isDisplay =
          number == prevPage ||
          number == prevPage - 1 ||
          number == nextPage ||
          number == nextPage + 1 ||
          number == firstPage ||
          number == lastPage;
        if (props.currentPage == number) {
          // 現在のページ数
          return (
            <div key={number} css={stylePageSelected}>
              {number}
            </div>
          );
        } else if (isDisplay) {
          // 表示するページ数
          return (
            <div
              key={number}
              css={stylePageDisplay}
              onClick={() => Paginate(number)}
            >
              {number}
            </div>
          );
        } else if (number == firstPage + 1 || number == lastPage - 1) {
          // ... の表示
          return (
            <div key={number} css={stylePageDisplay}>
              ...
            </div>
          );
        }
      })}
      {/** 最後のページへ */}
      {(() => {
        if (lastPage != props.currentPage) {
          return (
            <div css={stylePageDisplay} onClick={() => Paginate(lastPage)}>
              <BiLastPage css={stylePageMoveIcon} size={'1.2em'} />
            </div>
          );
        }
      })()}
    </div>
  );
};
export default Pagination;
