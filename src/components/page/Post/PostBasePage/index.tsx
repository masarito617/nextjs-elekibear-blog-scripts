import { Theme, css, keyframes } from '@emotion/react';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import AdsContentItem from '../ContentItems/AdsContentItem';
import ScrollTopButton from '../ScrollTopButton';
import {
  convertMarkdownPostMatterData,
  convertResponseMarkdownPostData,
} from 'api/markdown-api-utils';
import { ElementUtil } from 'common/ElementUtil';
import { TocContent } from 'common/TocElementUtil';
import Breadcrumb from 'components/common/Breadcrumb';
import BreadcrumbItem from 'components/common/Breadcrumb/BreadcrumbItem';
import HeadMeta from 'components/common/HeadMeta';
import HtmlTextPostContent from 'components/page/Post/Content/HtmlTextPostContent';
import MarkdownPostContent from 'components/page/Post/Content/MarkdownPostContent';
import EyeCatchImage from 'components/page/Post/EyeCatchImage';
import PostInfo from 'components/page/Post/PostInfo';
import RelatedPosts from 'components/page/Post/RelatedPosts';
import Title from 'components/page/Post/Title';
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
import TocWidget from 'components/widgets/TocWidget';
import SiteSettings from 'settings/SiteSettings';
import WidgetSettings from 'settings/WidgetSettings';
import { md } from 'style/media';
import { markdownData } from 'types/markdown-api';
import { apiMst } from 'types/mst-api';

const fadeInKeyframes = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 100;
  }
`;

const styleContentRoot = (theme: Theme) => css`
  background-color: ${theme.colors.simpleWhite};
  border-radius: 10px;
  padding: 20px 29px;
  margin-left: 16px;
  margin-bottom: 48px;
  animation: ${fadeInKeyframes} 0.7s ease 0s 1 normal;
  overflow-x: scroll;

  ${md(css`
    padding: 16px;
    margin: 0px;
  `)}
`;

/**
 * ページで使用する全てのScirpts定義を挿入する
 * next/script ではSPAでのページ更新時に反映されない場合があったため、
 * useEffect内で再度importさせることで対処
 * https://qiita.com/Sotq_17/items/66e43ac261b80c6ee612
 */
const appendAllScripts = () => {
  SiteSettings.PostImportScriptArray.map((importScript) => {
    ElementUtil.appendScript(
      importScript.src,
      importScript.id,
      importScript.isAsync,
      importScript.onLoad,
    );
  });
};
const removeAllScirpts = () => {
  SiteSettings.PostImportScriptArray.map((importScript) => {
    ElementUtil.removeById(importScript.id);
  });
};

// 記事ファイルの変更監視(執筆用)
// tools/express-post-watcher を別途立ち上げておく必要がある
function watchPostMdContent(
  setChangePostContent: (postData: markdownData.postData) => void,
  allCategories: apiMst.Categories,
  allTags: apiMst.Tags,
) {
  if (process.env.NODE_ENV === 'development') {
    const socket = io('http://localhost:4000');
    socket.on('connect', () => console.log('post-watcher connected.'));
    socket.on('disconnect', () => console.log('post-watcher disconnected.'));

    // 記事データの更新を受け取る
    socket.on('postMdChange', (data: { content: string; filePath: string }) => {
      const matterData = convertMarkdownPostMatterData(
        data.content,
        data.filePath,
      );
      const markdownPostData = convertResponseMarkdownPostData(
        matterData,
        allCategories,
        allTags,
      );
      setChangePostContent(markdownPostData);

      // scriptsも再度読み込む
      removeAllScirpts();
      appendAllScripts();
    });

    return () => {
      socket.close();
    };
  }
}

export type PostBasePageProps = {
  post: apiMst.Post;
  postContent: string;
  postUrlPath: string;
  isMarkdown: boolean;
  slug: string;
  allPosts: apiMst.Posts;
  allCategories: apiMst.Categories;
  allCategoryIdIncludeChildInfo: apiMst.AllCategoryIdIncludeChildInfo;
  allTags: apiMst.Tags;
  isShowSidebar: boolean;
};

/**
 * 記事ページ共通
 * @param props
 * @returns
 */
const PostBasePage = (props: PostBasePageProps) => {
  let post: apiMst.Post = props.post;

  // dangerouslySetInnerHTML のWarning防止
  // https://stackoverflow.com/questions/58266356/what-is-happening-such-i-receive-dangerouslysetinnerhtml-warning-and-empty-conte
  const [render, setRender] = useState(false);
  useEffect(() => {
    setRender(true);
  }, []);

  // 記事用scriptタグのimport
  useEffect(() => {
    appendAllScripts();
    return () => {
      removeAllScirpts();
    };
  }, [props]);

  // 記事ファイルの変更監視
  const [changeMarkdownPostData, setChangeMarkdownPostData] =
    useState<markdownData.postData>();
  const setChangePostContent = (postData: markdownData.postData) => {
    setChangeMarkdownPostData(postData);
    setPostTocContent([]);
  };
  useEffect(() => {
    watchPostMdContent(
      setChangePostContent,
      props.allCategories,
      props.allTags,
    );
  }, []);

  // 目次情報 (記事データ変換時に設定する)
  const [postTocContent, setPostTocContent] = useState<TocContent[]>([]);
  useEffect(() => {
    setPostTocContent([]);
  }, [props]);
  const pushPostTocContent = (tocContent: TocContent) => {
    if (postTocContent.some((content) => content.id === tocContent.id)) {
      return;
    }
    postTocContent.push(tocContent);
    setPostTocContent([...postTocContent]);
  };

  // 記事データをReactComponentに変換する
  let postContentElement: string | JSX.Element | JSX.Element[] = '';
  if (props.isMarkdown) {
    // ========== Markdown記事 ==========
    let postContent = props.postContent;

    // ローカルで変更されていたら反映する
    if (changeMarkdownPostData) {
      post = changeMarkdownPostData.meta.mstPost;
      postContent = changeMarkdownPostData?.content;
    }

    postContentElement = (
      <MarkdownPostContent
        allPosts={props.allPosts}
        postContent={postContent}
        postTocContents={postTocContent}
        pushPostTocContent={pushPostTocContent}
      />
    );
  } else {
    // ========== HTMLText記事 ==========
    postContentElement = (
      <HtmlTextPostContent
        postContent={props.postContent}
        pushPostTocContent={pushPostTocContent}
      />
    );
  }

  return (
    <>
      <HeadMeta
        title={`${post.title} | 都会のエレキベア`}
        description="都会の住むエレキベアとマイケルの技術系ブログ"
        url={`https://${SiteSettings.SiteDomainName}${props.postUrlPath}`}
        siteName="都会のエレキベア"
        type="article"
        imageUrl={post.featuredImage}
        imageWidth={800}
        imageHeight={600}
      />
      <Layout
        mainContent={
          <>
            <Breadcrumb>
              <BreadcrumbItem href="/" isHome={true}>
                ホーム
              </BreadcrumbItem>
              <BreadcrumbItem>{props.slug}</BreadcrumbItem>
            </Breadcrumb>
            <div css={styleContentRoot}>
              <Title title={post.title} />
              <PostInfo post={post} />
              <EyeCatchImage sourceUrl={post.featuredImage} />
              <AdsContentItem />
              {render && postContentElement}
              <br />
              <PostInfo post={post} />
              <AdsContentItem />
              <RelatedPosts post={props.post} allPosts={props.allPosts} />
              <ScrollTopButton />
            </div>
          </>
        }
        sideBarContent={
          props.isShowSidebar ? (
            <>
              <SearchWidget />
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
              />
              <TagWidget
                tags={props.allTags.tags}
                allPosts={props.allPosts.posts}
              />
              <AdsWidget />
              <TocWidget tocContents={postTocContent} />
            </>
          ) : null
        }
        allCategories={props.allCategories}
      />
    </>
  );
};
export default PostBasePage;
