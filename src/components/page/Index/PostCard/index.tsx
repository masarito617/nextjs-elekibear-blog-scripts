import { Theme, css, keyframes } from '@emotion/react';
import Link from 'next/link';
import { BiSolidTime } from 'react-icons/bi';
import ResizeImage from 'components/common/ResizeImage';
import { lg, md, sm } from 'style/media';

const moveFadeInKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 100;
  }
`;

const styleRoot = (theme: Theme) => css`
  position: relative;
  display: flex;
  flex-flow: column;
  background-color: ${theme.colors.simpleWhite};
  box-shadow: 8px 8px 2px 1px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  width: 90%;
  min-width: 120px;
  margin: 0px 2.5% 25px 2.5%;
  animation: ${moveFadeInKeyframes} 0.7s ease 0s 1 normal;
  transition: all 0.3s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
    transform: translateY(-4px);
  }
`;

const styleImageWrapper = css`
  display: flex;
  position: relative;
  border-radius: 10px 10px 0px 0px;
  border: none;
  width: 100.5%; // 白線が入る対策
  height: 180px;
  margin: 0px;
  padding: 0px;
  overflow: hidden;

  ${lg(css`
    height: 200px;
  `)}
  ${md(css`
    height: 160px;
  `)}
  ${sm(css`
    height: 120px;
  `)}
`;

const styleImage = css`
  margin: 0px;
  object-fit: cover !important;
  width: 100% !important;
  height: auto;
`;

const styleCategory = (theme: Theme) => css`
  position: absolute;
  top: 4%;
  left: 2%;
  background-color: ${theme.colors.primaryDarkGray};
  color: ${theme.colors.primaryYellow};
  border: 1px solid #eee;
  font-size: 11px;
  padding: 1px 5px;
`;

const styleContent = css`
  padding-bottom: 1.2em;
  position: relative;
  height: auto;
`;

const styleTitle = (theme: Theme) => css`
  margin: 6px 8px 8px 8px;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.6;
  color: ${theme.colors.primaryDarkGray};
  display: inline-block;
  text-decoration: none;

  ${md(css`
    font-size: 10px;
  `)}
`;

const styleDate = (theme: Theme) => css`
  position: absolute;
  bottom: 2px;
  right: 4px;
  text-align: right;
  line-height: 1;
  font-size: 0.7em;
  color: ${theme.colors.primaryDarkGray};
  margin: 0px 12px 6px 0px;
`;

const styleDateIconWrapper = css`
  position: absolute;
  left: -14px;
`;

type PostCardProps = {
  id: string;
  src: string;
  category: string;
  title: string;
  date: string;
  slug: string;
};

/**
 * 記事カード
 * @param props
 * @returns
 */
const PostCard = (props: PostCardProps) => {
  return (
    <article id={props.id} css={styleRoot}>
      <Link href={`/post/${props.slug}`}>
        <figure css={styleImageWrapper}>
          {/* <img src={props.src} alt="" css={styleImage} /> */}
          <ResizeImage
            src={props.src}
            originalWidth={800}
            originalHeight={600}
            resizeWidth={320}
            alt=""
            addCss={styleImage}
            isShowLoading={true}
          />
        </figure>
        <span css={styleCategory}>{props.category}</span>
        <div css={styleContent}>
          <h2 css={styleTitle}>{props.title}</h2>
        </div>
        <div css={styleDate}>
          <span css={styleDateIconWrapper}>
            <BiSolidTime size={'0.7rem'} />
          </span>
          {props.date.substring(0, 10)}
        </div>
      </Link>
    </article>
  );
};
export default PostCard;
