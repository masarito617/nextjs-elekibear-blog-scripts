import { Theme, css } from '@emotion/react';
import Link from 'next/link';
import CategoryMenu from './CategoryMenu';
import ResizeImage from 'components/common/ResizeImage';
import SiteSettings from 'settings/SiteSettings';
import { lg } from 'style/media';
import { apiMst } from 'types/mst-api';

const styleRoot = (theme: Theme) => css`
  width: 100%;
  background-color: ${theme.colors.primaryDarkGray};
  ${lg(css`
    position: fixed;
    top: 0;
    z-index: ${theme.zindex.fixedHeader};
  `)}
`;

const styleContent = css`
  height: 48px;
  width: 98%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const styleFixedContent = css`
  height: 48px;
  display: none;
  ${lg(css`
    display: block;
  `)}
`;

/**
 * ヘッダー
 * @returns
 */
const Header = (props: {
  allCategories: apiMst.Categories;
  setCategoryStateAction?: (slug: string) => void;
}) => {
  const menuPathArray = SiteSettings.CategoryMenuPathArray;
  return (
    <>
      <header>
        <div css={styleRoot}>
          <div css={styleContent}>
            <Link
              href={`/`}
              onClick={() => {
                // カテゴリ指定もクリアする
                if (props.setCategoryStateAction) {
                  props.setCategoryStateAction('');
                }
              }}
            >
              <ResizeImage
                src="/img/common/header_home_icon.png"
                alt=""
                originalWidth={556}
                originalHeight={163}
                resizeWidth={92}
                addCss={css`
                  padding-left: 24px;
                `}
                priority={true}
              />
            </Link>
            {props.allCategories ? (
              <CategoryMenu
                allCategories={props.allCategories}
                menuPathArray={menuPathArray}
                setCategoryStateAction={props.setCategoryStateAction}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        {/** fixedにした際の表示位置調整用 */}
        <div css={styleFixedContent}></div>
      </header>
    </>
  );
};
export default Header;
