import { Theme, css, useTheme } from '@emotion/react';
import Footer from 'components/templates/Footer';
import Header from 'components/templates/Header';
import Sidebar from 'components/templates/Sidebar';
import TitleArea from 'components/templates/TitleArea';
import { lg, xl } from 'style/media';
import { apiMst } from 'types/mst-api';

const styleContentWrapper = (isShowSidebar: boolean) => css`
  display: flex;
  justify-content: ${isShowSidebar ? 'space-between' : 'center'};
  flex-wrap: wrap;
  margin: 0px auto;
  width: 1280px;

  ${xl(css`
    width: auto;
  `)}
  ${lg(css`
    display: block;
  `)}
`;

const styleMain = (theme: Theme, isShowSidebar: boolean) => css`
  position: relative;
  z-index: ${theme.zindex.main};
  margin: 0 0.5%;
  width: ${isShowSidebar ? '800px' : '1280px'};

  ${xl(css`
    width: ${isShowSidebar ? '65%' : 'auto'};
  `)}
  ${lg(css`
    width: auto;
    margin: 0px 8px;
  `)}
`;

interface LayoutProps {
  mainContent: React.ReactNode;
  sideBarContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  allCategories: apiMst.Categories;
  setCategoryStateAction?: (slug: string) => void;
  setSearchWordStateAction?: (slug: string) => void;
}

/**
 * ページ全体のレイアウト
 * @param props
 * @returns
 */
const Layout = (props: LayoutProps) => {
  const theme = useTheme();

  // サイドバーを表示するか？
  const isShowSidebar = props.sideBarContent ? true : false;

  return (
    <>
      <Header
        allCategories={props.allCategories}
        setCategoryStateAction={props.setCategoryStateAction}
      />
      <TitleArea />
      <div css={styleContentWrapper(isShowSidebar)}>
        <main css={styleMain(theme, isShowSidebar)}>{props.mainContent}</main>
        {isShowSidebar ? (
          <Sidebar sideBarContent={props.sideBarContent} />
        ) : (
          <></>
        )}
      </div>
      {props.bottomContent}
      <Footer />
    </>
  );
};
export default Layout;
