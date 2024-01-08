import { createContext } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { TocContent } from 'common/TocElementUtil';
import TocContentItem from 'components/page/Post/ContentItems/TocContentItem';
import CustomCodeBlock from 'parser/markdown/CustomCodeBlock';
import CustomParagraphBlock from 'parser/markdown/CustomParagraphBlock';
import CustomPreBlock from 'parser/markdown/CustomPreBlock';
import {
  CreateH2TocContent,
  CreateH3TocContent,
  CreateH4TocContent,
  CreateH5TocContent,
  CreateH6TocContent,
  CustomH2Block,
  CustomH3Block,
  CustomH4Block,
  CustomH5Block,
  CustomH6Block,
} from 'parser/markdown/CustomTocBlock';
import { apiMst } from 'types/mst-api';

// ReactMarkdown カスタムComponentへの受け渡し用
export const TocContentsContext = createContext({
  pushPostTocContent: (tocContent: TocContent) => {},
});
export const PostsContext = createContext<apiMst.Posts>({
  posts: [],
});

/**
 * マークダウン用 記事コンテンツ
 * @param props
 * @returns
 */
const MarkdownPostContent = (props: {
  allPosts: apiMst.Posts;
  postContent: string;
  postTocContents: TocContent[];
  pushPostTocContent: (tocContent: TocContent) => void;
}) => {
  const postContent = props.postContent;
  const postTocContents = props.postTocContents;
  const pushPostTocContent = props.pushPostTocContent;

  return (
    <div className="entry-content">
      {/** 目次部分 ReactMarkdown内で要素を抽出してContext経由で設定、TocComponentで表示する */}
      <TocContentsContext.Provider
        value={{
          pushPostTocContent,
        }}
      >
        <ReactMarkdown
          allowedElements={['h2', 'h3', 'h4', 'h5', 'h6']}
          components={{
            h2: CreateH2TocContent,
            h3: CreateH3TocContent,
            h4: CreateH4TocContent,
            h5: CreateH5TocContent,
            h6: CreateH6TocContent,
          }}
          skipHtml={true}
        >
          {postContent}
        </ReactMarkdown>
        <TocContentItem tocContents={postTocContents} />
      </TocContentsContext.Provider>
      {/** 記事部分 */}
      <PostsContext.Provider value={props.allPosts}>
        {/** オプション: https://github.com/remarkjs/react-markdown?tab=readme-ov-file#options */}
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: CustomH2Block,
            h3: CustomH3Block,
            h4: CustomH4Block,
            h5: CustomH5Block,
            h6: CustomH6Block,
            code: CustomCodeBlock,
            pre: CustomPreBlock,
            p: CustomParagraphBlock,
          }}
          rehypePlugins={[rehypeRaw]} // HTMLを使用できるようにする
        >
          {postContent}
        </ReactMarkdown>
      </PostsContext.Provider>
    </div>
  );
};
export default MarkdownPostContent;
