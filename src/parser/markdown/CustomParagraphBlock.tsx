import ImageContentItem from '../../components/page/Post/ContentItems/ImageContentItem';

/**
 * pブロックのカスタム
 * @param param0
 * @returns
 */
const CustomParagraphBlock = ({ node, children, ...rest }: any) => {
  // imgタグをnext/imageに変換
  if (node.children[0].tagName === 'img') {
    return <ImageContentItem node={node} />;
  }
  return <p>{children}</p>;
};
export default CustomParagraphBlock;
