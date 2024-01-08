import { SerializedStyles, Theme, css, keyframes } from '@emotion/react';

const fadeInKeyframes = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 100;
  }
`;

const styleRoot = (theme: Theme) => css`
  background-color: ${theme.colors.simpleWhite};
  border-radius: 12px;
  box-shadow: 8px 8px 2px 1px rgba(0, 0, 0, 0.3);
  animation: ${fadeInKeyframes} 0.7s ease 0s 1 normal;
  margin-bottom: 1.4em;
`;

const styleTitle = (theme: Theme) => css`
  background: ${theme.colors.primaryLightGray};
  color: ${theme.colors.primaryWhite};
  font-size: 16px;
  margin: 0px;
  border-radius: 10px 10px 0px 0px;
  padding: 12px;
`;

const styleContent = css`
  margin: 0px;
  box-sizing: border-box;
  overflow-wrap: break-word;
`;

interface SideWidgetBaseProps {
  children: React.ReactNode;
  title: string;
  addCss?: SerializedStyles;
}

/**
 * サイドバーウィジェット
 * @param props
 * @returns
 */
const SideWidgetBase = (props: SideWidgetBaseProps) => {
  return (
    <aside css={[styleRoot, props.addCss]}>
      <h3 css={styleTitle}>{props.title}</h3>
      <div css={styleContent}>{props.children}</div>
    </aside>
  );
};
export default SideWidgetBase;
