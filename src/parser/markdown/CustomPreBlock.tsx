import { ExtraProps } from 'react-markdown';

/**
 * preブロックのカスタム
 * @param param0
 * @returns
 */
const CustomPreBlock = ({
  children,
  className,
  node,
  ...rest
}: JSX.IntrinsicElements['pre'] & ExtraProps) => {
  // codeブロック内に付与されるpre要素と相性が悪いため無効にしておく.
  return <>{children}</>;
};
export default CustomPreBlock;
