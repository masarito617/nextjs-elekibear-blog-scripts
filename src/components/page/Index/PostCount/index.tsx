import { Theme, css, keyframes } from '@emotion/react';
import { lg, md } from 'style/media';

const fadeInKeyframes = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 100;
  }
`;

const styleRoot = (theme: Theme) => css`
  position: absolute;
  top: 0px;
  right: 60px;
  font-size: 14px;
  color: ${theme.colors.primaryWhite};
  animation: ${fadeInKeyframes} 0.7s ease 0s 1 normal;
  ${lg(css`
    right: 56px;
  `)}
  ${md(css`
    right: 48px;
    font-size: 12px;
  `)}
`;

/**
 * 表示中の記事数
 * @param props
 * @returns
 */
const PostCount = (props: {
  allPostCount: number;
  pageNo: number;
  displayCount: number;
}) => {
  // 開始、終了インデックスの計算
  let endDisplayPostCount = props.displayCount * props.pageNo;
  const startDisplayPostCount = endDisplayPostCount - props.displayCount + 1;
  if (endDisplayPostCount > props.allPostCount) {
    endDisplayPostCount = props.allPostCount;
  }
  if (startDisplayPostCount >= endDisplayPostCount) {
    return (
      <div css={styleRoot}>
        {endDisplayPostCount} / {props.allPostCount} 件
      </div>
    );
  }
  return (
    <div css={styleRoot}>
      {startDisplayPostCount} - {endDisplayPostCount} / {props.allPostCount} 件
    </div>
  );
};
export default PostCount;
