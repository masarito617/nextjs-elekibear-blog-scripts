import { Theme, css, useTheme } from '@emotion/react';
import Link from 'next/link';
import React from 'react';
import { BiSolidHome } from 'react-icons/bi';
import { md } from 'style/media';

const styleBreadcrumbItem = (color: string) => css`
  list-style: none;
  display: inline;
  font-size: 14px;
  color: ${color};

  &:not(:first-child) {
    &::before {
      content: '/';
      color: ${color};
      padding: 0px 6px;
    }
  }

  ${md(css`
    font-size: 12px;
  `)}
`;

const styleHomeIconWrapper = css`
  margin-right: 4px;
`;

const styleLink = (theme: Theme, color: string) => css`
  text-decoration: none;
  color: ${color};

  &:hover {
    color: ${theme.colors.primaryYellow};
  }
`;

const BreadcrumbItemIcon = (props: { isHome: boolean | undefined }) => {
  if (!props.isHome) {
    return <></>;
  }
  return (
    <span css={styleHomeIconWrapper}>
      <BiSolidHome size={'0.7rem'} />
    </span>
  );
};

/**
 * ぱんクズリストアイテム
 * @param props
 * @returns
 */
const BreadcrumbItem = (props: {
  children: React.ReactNode;
  color?: string;
  href?: string;
  query?: { search?: string; category?: string; tag?: string };
  onClick?: () => void;
  isHome?: boolean;
}) => {
  // 色が指定されていなければ白を指定
  const theme = useTheme();
  let color = props.color;
  if (!color) {
    color = theme.colors.primaryWhite;
  }

  return (
    <li css={styleBreadcrumbItem(color)}>
      {props.href ? (
        <Link
          css={styleLink(theme, color)}
          href={{ pathname: props.href, query: props.query }}
          onClick={props.onClick}
        >
          <BreadcrumbItemIcon isHome={props.isHome} />
          {props.children}
        </Link>
      ) : (
        <>
          {props.isHome ? (
            <span css={styleHomeIconWrapper}>
              <BiSolidHome size={'0.7rem'} />
            </span>
          ) : (
            <></>
          )}
          {props.children}
        </>
      )}
    </li>
  );
};
export default BreadcrumbItem;
