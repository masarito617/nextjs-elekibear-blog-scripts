import { useContext } from 'react';
import { TocContentsContext } from 'components/page/Post/Content/MarkdownPostContent';

const CreateId = (prefix: string, node: any) => {
  return `${prefix}-${node?.position?.start.line}`;
};

/**
 * 目次要素の作成
 * @param props
 * @returns
 */
const CreateTocContent = (props: { node: any; title: string; tag: string }) => {
  const id = CreateId(props.tag, props.node);
  const title = props.title;
  const tag = props.tag;

  // Contextにpush
  const tocContentsContext = useContext(TocContentsContext);
  tocContentsContext.pushPostTocContent({
    id: id,
    title: title,
    tag: tag,
  });
  return <></>;
};

/**
 * 目次部分
 * 表示はせず目次要素の抽出のみ行う
 * @param param0
 * @returns
 */
const CreateH2TocContent = ({ children, node, ...rest }: any) => {
  return <CreateTocContent node={node} title={children} tag={'h2'} />;
};
const CreateH3TocContent = ({ children, node, ...rest }: any) => {
  return <CreateTocContent node={node} title={children} tag={'h3'} />;
};
const CreateH4TocContent = ({ children, node, ...rest }: any) => {
  return <CreateTocContent node={node} title={children} tag={'h4'} />;
};
const CreateH5TocContent = ({ children, node, ...rest }: any) => {
  return <CreateTocContent node={node} title={children} tag={'h5'} />;
};
const CreateH6TocContent = ({ children, node, ...rest }: any) => {
  return <CreateTocContent node={node} title={children} tag={'h6'} />;
};

/**
 * 実際の要素部分
 * idを付与する
 * @param param0
 * @returns
 */
const CustomH2Block = ({ children, node, ...rest }: any) => {
  const id = CreateId('h2', node);
  return <h2 id={id}>{children}</h2>;
};
const CustomH3Block = ({ children, node, ...rest }: any) => {
  const id = CreateId('h3', node);
  return <h2 id={id}>{children}</h2>;
};
const CustomH4Block = ({ children, node, ...rest }: any) => {
  const id = CreateId('h4', node);
  return <h4 id={id}>{children}</h4>;
};
const CustomH5Block = ({ children, node, ...rest }: any) => {
  const id = CreateId('h5', node);
  return <h5 id={id}>{children}</h5>;
};
const CustomH6Block = ({ children, node, ...rest }: any) => {
  const id = CreateId('h6', node);
  return <h6 id={id}>{children}</h6>;
};

export {
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
};
