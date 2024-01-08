import { GetStaticProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { getAllMarkdownPosts } from 'api/markdown-api';
import {
  getAllCategories,
  getAllCategoryIdIncludeChildInfo,
  getAllPosts,
  getAllTags,
} from 'api/mst-api';
import HeadMeta from 'components/common/HeadMeta';
import BreadcrumbItems from 'components/page/Index/BreadcrumbItems';
import Pagination from 'components/page/Index/Pagination';
import PostCardList from 'components/page/Index/PostCardList';
import PostCount from 'components/page/Index/PostCount';
import Layout from 'components/templates/Layout';
import AdsWidget from 'components/widgets/AdsWidget';
import AppWidget from 'components/widgets/AppWidget';
import AssetPostWidget from 'components/widgets/AssetPostWidget';
import CategoryWidget from 'components/widgets/CategoryWidget';
import CharactersWidget from 'components/widgets/CharactersWidget';
import NewPostWidget from 'components/widgets/NewPostWidget';
import NoticeWidget from 'components/widgets/NoticeWidget';
import SearchWidget from 'components/widgets/SearchWidget';
import TagWidget from 'components/widgets/TagWidget';
import SiteSettings from 'settings/SiteSettings';
import WidgetSettings from 'settings/WidgetSettings';
import { apiMst } from 'types/mst-api';

/**
 * クエリパラメータのチェック
 */
function checkQueryParameters(
  setCurrentPageState: (page: number) => void,
  setCurrentSearchWord: (slug: string) => void,
  setCurrentCategorySlug: (slug: string) => void,
  setCurrentTagSlug: (slug: string) => void,
): void {
  const url = new URL(window.location.href);

  // ページ指定
  const paramPage = url.searchParams.get(SiteSettings.UrlParamNamePage);
  if (paramPage && !Number.isNaN(parseInt(paramPage))) {
    const pageno = parseInt(paramPage);
    setCurrentPageState(pageno);
  }

  // フィルタ指定 (検索 -> カテゴリ -> タグ の優先順)
  // 検索ワード指定
  const paramSearchWord = url.searchParams.get(SiteSettings.UrlParamNameSearch);
  if (paramSearchWord) {
    setCurrentSearchWord(encodeURI(paramSearchWord).toLowerCase());
    return;
  }

  // カテゴリ指定
  const paramCategorySlug = url.searchParams.get(
    SiteSettings.UrlParamNameCateogry,
  );
  if (paramCategorySlug) {
    setCurrentCategorySlug(encodeURI(paramCategorySlug).toLowerCase());
    return;
  }

  // タグ指定
  const paramTagSlug = url.searchParams.get(SiteSettings.UrlParamNameTag);
  if (paramTagSlug) {
    setCurrentTagSlug(encodeURI(paramTagSlug).toLowerCase());
    return;
  }
}

/**
 * 投稿記事のフィルタ処理
 */
function filterAllPosts(
  allPosts: apiMst.Post[],
  allCategoryIdIncludeChildInfo: apiMst.AllCategoryIdIncludeChildInfo,
  currentSearchWord: string,
  currentCategorySlug: string,
  currentTagSlug: string,
): apiMst.Post[] {
  // フィルタ処理 (検索 -> カテゴリ -> タグ の優先順)
  // 指定検索ワードでフィルタ
  if (currentSearchWord) {
    console.log(currentSearchWord);
    return allPosts.filter((post) => {
      return encodeURI(post.title).toLowerCase().includes(currentSearchWord);
    });
  }

  // 指定カテゴリのみにフィルタ
  if (currentCategorySlug) {
    const categoryIdArray: string[] =
      allCategoryIdIncludeChildInfo[currentCategorySlug].categoryIds;
    if (categoryIdArray) {
      return allPosts.filter((post) => {
        const categories = post.categories;
        const isContainCategory = categories.some((category) =>
          categoryIdArray.includes(category.id.toString()),
        );
        return isContainCategory;
      });
    }
    return allPosts;
  }

  // 指定タグのみにフィルタ
  if (currentTagSlug) {
    return allPosts.filter((post) => {
      const tags = post.tags;
      const isContainTag = tags.some(
        (tag) => encodeURI(tag.slug).toLowerCase() == currentTagSlug,
      );
      return isContainTag;
    });
  }
  return allPosts;
}

/**
 * 記事リストページ(ホーム)
 * @returns
 */
const HomePage: NextPage<HomePageProps> = (props: HomePageProps) => {
  // State定義
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSearchWord, setCurrentSearchWord] = useState<string>('');
  const [currentCategorySlug, setCurrentCategorySlug] = useState<string>('');
  const [currentTagSlug, setCurrentTagSlug] = useState<string>('');

  function SetPageState(page: number) {
    setCurrentPage(page);
  }
  // フィルタ条件が指定された場合、ページは最初に戻す
  function SetSearchWordState(searchWord: string) {
    setCurrentSearchWord(searchWord);
    setCurrentCategorySlug('');
    setCurrentTagSlug('');
    SetPageState(1);
  }
  function SetCategorySlugState(slug: string) {
    setCurrentSearchWord('');
    setCurrentCategorySlug(slug);
    setCurrentTagSlug('');
    SetPageState(1);
  }
  function SetTagSlugState(slug: string) {
    setCurrentSearchWord('');
    setCurrentCategorySlug('');
    setCurrentTagSlug(slug);
    SetPageState(1);
  }

  // クエリパラメータのチェック
  useEffect(() => {
    checkQueryParameters(
      SetPageState,
      SetSearchWordState,
      SetCategorySlugState,
      SetTagSlugState,
    );
  }, []);

  const displayPostCount = SiteSettings.DisplayPostsCount;
  let allPosts: apiMst.Post[] = props.allPosts.posts;

  // 検索ワード、カテゴリ、タグでフィルタ
  allPosts = filterAllPosts(
    allPosts,
    props.allCategoryIdIncludeChildInfo,
    currentSearchWord,
    currentCategorySlug,
    currentTagSlug,
  );

  // 指定ページの記事のみにslice
  const startIndex = (currentPage - 1) * SiteSettings.DisplayPostsCount;
  const endIndex = startIndex + SiteSettings.DisplayPostsCount;
  const posts = allPosts.slice(startIndex, endIndex);

  return (
    <>
      <HeadMeta
        title="都会のエレキベア"
        description="都会の住むエレキベアとマイケルの技術系ブログ"
        url={`https://${SiteSettings.SiteDomainName}`}
        siteName="都会のエレキベア"
        type="website"
        imageUrl="https://wp-next-elekibear.netlify.app/img/common/title_logo.png"
        imageWidth={390}
        imageHeight={222}
      />
      <Layout
        mainContent={
          <>
            <BreadcrumbItems
              searchWord={currentSearchWord}
              setSearchWordState={SetSearchWordState}
              categorySlug={currentCategorySlug}
              allCategories={props.allCategories}
              setCategoryState={SetCategorySlugState}
              tagSlug={currentTagSlug}
              allTags={props.allTags}
              setTagState={SetTagSlugState}
            ></BreadcrumbItems>
            <PostCount
              allPostCount={allPosts.length}
              pageNo={currentPage}
              displayCount={SiteSettings.DisplayPostsCount}
            />
            <PostCardList allPosts={posts} />
            <Pagination
              displayPostCount={displayPostCount}
              totalPostCount={allPosts.length}
              currentPage={currentPage}
              setPageStateAction={SetPageState}
            />
          </>
        }
        sideBarContent={
          <>
            <SearchWidget
              setSearchWordStateAction={SetSearchWordState}
            ></SearchWidget>
            <NoticeWidget />
            <CharactersWidget />
            <AppWidget />
            <AdsWidget />
            <NewPostWidget posts={props.allPosts.posts.slice(0, 5)} />
            <AssetPostWidget />
            <CategoryWidget
              allCategories={props.allCategories}
              allCategoryIdIncludeChildInfo={
                props.allCategoryIdIncludeChildInfo
              }
              allPosts={props.allPosts.posts}
              menuPathArray={WidgetSettings.CategoryWidgetPathArray}
              setCategoryStateAction={SetCategorySlugState}
            />
            <TagWidget
              tags={props.allTags.tags}
              allPosts={props.allPosts.posts}
              setTagStateAction={SetTagSlugState}
            />
          </>
        }
        allCategories={props.allCategories}
        setCategoryStateAction={SetCategorySlugState}
        setSearchWordStateAction={SetSearchWordState}
      />
    </>
  );
};
export default HomePage;

type HomePageProps = {
  allPosts: apiMst.Posts;
  allCategories: apiMst.Categories;
  allCategoryIdIncludeChildInfo: apiMst.AllCategoryIdIncludeChildInfo;
  allTags: apiMst.Tags;
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  // postタイプの記事のみ一覧表示する
  const allPosts: apiMst.Posts = getAllPosts('post');
  const allCategories: apiMst.Categories = getAllCategories();
  const allCategoryIdIncludeChildInfo =
    getAllCategoryIdIncludeChildInfo(allCategories);
  const allTags: apiMst.Tags = getAllTags();

  // マークダウンの記事データも追加
  const allMarkdownPost = getAllMarkdownPosts(allCategories, allTags, 'post');
  allMarkdownPost.forEach((markdownPost) => {
    allPosts.posts.unshift(markdownPost.meta.mstPost);
  });

  return {
    props: {
      allPosts,
      allCategories,
      allCategoryIdIncludeChildInfo,
      allTags,
    },
  };
};
