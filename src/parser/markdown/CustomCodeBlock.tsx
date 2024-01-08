import { useContext } from 'react';
import { ExtraProps } from 'react-markdown';
import PointBoxContentItem from '../../components/page/Post/ContentItems/PointBoxContentItem';
import PostCardContentItem from '../../components/page/Post/ContentItems/PostCardContentItem';
import PrismCodeContentItem from '../../components/page/Post/ContentItems/PrismCodeContentItem';
import TalkContentItem from '../../components/page/Post/ContentItems/TalkContentItem';
import { PostsContext } from 'components/page/Post/Content/MarkdownPostContent';
import AdsContentItem from 'components/page/Post/ContentItems/AdsContentItem';
import TableContentItem from 'components/page/Post/ContentItems/TableContentItem';

/**
 * コードブロックのカスタム
 * markdownのカスタム書式を一から作るのは手間だったので
 * コードブロックで指定された文字から無理やり変換
 * 参考: https://qiita.com/bigmon/items/de62335fbf8388192499
 * @param param0
 * @returns
 */
const CustomCodeBlock = ({
  children,
  className,
  node,
  ...rest
}: JSX.IntrinsicElements['code'] & ExtraProps) => {
  // Contextから記事情報を取得
  const allPosts = useContext(PostsContext);

  // カスタム値の判定材料を抽出
  const prefix = 'language-';
  const classes = className
    ?.split(' ')
    .find((c) => c.startsWith(prefix))
    ?.replace(prefix, '');
  const params = classes ? classes.split(':') : [];

  // ===== キャラクター会話コンポーネント =====
  if (params.length >= 4 && params[0] == 'talk') {
    const position = params[1];
    const character = params[2];
    const characterOption = params[3];

    return (
      <TalkContentItem
        position={position}
        character={character}
        characterOption={Number(characterOption)}
      >
        {children}
      </TalkContentItem>
    );
  }

  // ===== Prismコードブロック =====
  if (params.length >= 3 && params[0] == 'prism') {
    const language = params[1];
    const fileName = params[2];
    const toggleText = params.length >= 4 ? params[3] : '';
    const detailText = params.length >= 5 ? params[4] : '';

    return (
      <PrismCodeContentItem
        language={language}
        fileName={fileName}
        toggleText={toggleText}
        detailText={detailText}
      >
        {children}
      </PrismCodeContentItem>
    );
  }

  // ===== ポイント欄 =====
  if (params.length >= 2 && params[0] == 'point') {
    const title = params[1];
    return <PointBoxContentItem title={title}>{children}</PointBoxContentItem>;
  }

  // ===== テーブル =====
  if (params.length >= 2 && params[0] == 'table') {
    const className = params[1];
    const title = params.length >= 3 ? params[2] : '';
    return (
      <TableContentItem className={className} title={title}>
        {children}
      </TableContentItem>
    );
  }

  // ===== 記事カード =====
  if (params.length >= 1 && params[0] == 'card') {
    if (typeof children !== 'string') {
      console.log('PostCard contains an invalid element!!');
      return;
    }

    // 記事情報を取得して渡す
    const slug = children.trim();
    const post = allPosts.posts.find((post) => post.slug === slug);
    if (!post) {
      console.log(`PostCard not found slug => ${slug}`);
      return <></>;
    }
    return <PostCardContentItem post={post} />;
  }

  // ===== GoogleAdsence広告 =====
  if (params.length >= 1 && params[0] == 'ads') {
    return <AdsContentItem />;
  }

  // ===== HTMLエスケープ表示 =====
  if (params.length >= 1 && params[0] == 'escape') {
    if (typeof children !== 'string') {
      console.log('HTMLComponent contains an invalid element!!');
      return;
    }
    return <>{children}</>;
  }

  // 通常のコンポーネントを返却
  return <code className={className}>{children}</code>;
};
export default CustomCodeBlock;
