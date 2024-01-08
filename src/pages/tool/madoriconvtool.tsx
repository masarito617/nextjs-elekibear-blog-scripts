import { Global, Theme, css, keyframes } from '@emotion/react';
import { NextPage, GetStaticProps } from 'next';
import {
  getAllCategories,
  getAllCategoryIdIncludeChildInfo,
  getAllPosts,
  getAllTags,
  getPostOrPageBySlug,
} from 'api/mst-api';
import Breadcrumb from 'components/common/Breadcrumb';
import BreadcrumbItem from 'components/common/Breadcrumb/BreadcrumbItem';
import HeadMeta from 'components/common/HeadMeta';
import EyeCatchImage from 'components/page/Post/EyeCatchImage';
import { PostBasePageProps } from 'components/page/Post/PostBasePage';
import PostInfo from 'components/page/Post/PostInfo';
import RelatedPosts from 'components/page/Post/RelatedPosts';
import Title from 'components/page/Post/Title';
import Layout from 'components/templates/Layout';
import SiteSettings from 'settings/SiteSettings';
import { md } from 'style/media';
import { apiMst } from 'types/mst-api';

// ========== ツール固有部分 ==========

const styleTool = css`
  .madori-area {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 840px;
  }
  .result-madori-area {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 800px;
    top: 40px;
  }
  .input-madori {
    height: 335px;
  }
  .input-madori-number,
  input[type='number'] {
    width: 85px;
  }
  .input-madori-height {
    position: absolute;
    top: 85px;
    left: 230px;
    padding: 30px;
  }
  .input-madori-width {
    position: absolute;
    top: 230px;
    left: 35px;
    padding: 30px;
  }
  .input-madori-area {
    position: absolute;
    top: 55px;
    left: 25px;
    padding: 30px;
  }
  .result-madori-number {
    display: inline-block;
    width: 50px;
    text-align: center;
  }
  .result-madori-height {
    position: absolute;
    top: 85px;
    left: 230px;
    padding: 30px;
  }
  .result-madori-width {
    position: absolute;
    top: 230px;
    left: 60px;
    padding: 30px;
  }
  .conv-button {
    margin: 0px 0px;
    color: yellow;
    border: 1px solid #000;
    width: 330px;
    height: 50px;
    font-size: 20px;
    background-color: #000;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
  }
`;

/**
 * Element操作関連
 * @param id
 * @returns
 */
const getElementValue = (id: string) => {
  const elem: any = document.getElementById(id);
  return elem?.value ? elem.value : '';
};
const setElementText = (id: string, value: string) => {
  const elem: any = document.getElementById(id);
  elem.innerText = value;
};

/**
 * 項目エラーチェック関連
 * @param val
 * @param name
 * @returns
 */
const checkItem = (val: any, name: any) => {
  // 必須チェック
  if (val == null || val == '') {
    setElementText('err_message', name + 'を入力してください。');
    return false;
  }
  // 数値チェック
  if (!isNumber(val) || val <= 0) {
    setElementText('err_message', name + 'には0以上の数字を入力してください。');
    return false;
  }
  return true;
};
function isNumber(val: any) {
  const regex = new RegExp(/^[-+]?[0-9]+(\.[0-9]+)?$/);
  return regex.test(val);
}

/**
 * 寸法を変換処理
 */
const PushConvSunpoButton = () => {
  const obj_input_area = document.querySelector('#input_area');
  const obj_input_area_tatami = document.querySelector('#input_area_tatami');

  // 定数値
  const tatami_1area = 1.82405;

  // 入力値取得
  const input_width = parseFloat(getElementValue('input_width'));
  const input_height = parseFloat(getElementValue('input_height'));
  let input_area = parseFloat(getElementValue('input_area'));
  const input_area_tatami = parseFloat(getElementValue('input_area_tatami'));
  const radio: any = document.getElementsByName('areaChkBox');

  // 入力チェック
  setElementText('err_message', ' ');
  if (!checkItem(input_width, '横幅')) {
    return;
  }
  if (!checkItem(input_height, '縦幅')) {
    return;
  }
  if (radio[0].checked) {
    if (!checkItem(input_area, '面積')) {
      return;
    }
  } else {
    // 畳でない場合
    if (!checkItem(input_area_tatami, '面積')) {
      return;
    }

    // 畳からm^2に変換
    input_area = input_area_tatami * tatami_1area;
  }

  // 寸法変換処理
  const ratio = input_height / input_width;
  const result_width = Math.sqrt(input_area / ratio);
  const result_height = result_width * ratio;

  // 変換結果を格納
  setElementText(
    'result_width',
    (Math.round(result_width * 100) / 100).toString(),
  );
  setElementText(
    'result_height',
    (Math.round(result_height * 100) / 100).toString(),
  );
};

/**
 * 間取り変換ツール部分
 * @returns
 */
const MadoriToolContent = () => {
  return (
    <>
      <Global styles={styleTool} />

      {/** 説明文 */}
      <div className="entry-content">
        <h2>間取り図寸法変換くん</h2>
        「引越し先のお部屋の寸法を測り忘れちゃった・・・。」
        <br />
        そんなときでもご安心！ こちらのツールを使えば、
        <mark>間取り図からお部屋の広さを算出</mark>できます！
        <br />
        （※間取り図は正確ではないため、ざっくりとした広さになることはご了承ください。。）
        <div className="roundbox">
          <div className="boxtitle">★使い方★</div>
          間取り図より下記を入力して「寸法に変換！」ボタンを押下すると、お部屋の寸法を算出します。
          <br />
          <br />
          *******************************************************
          <br />
          ① お部屋の面積（m^2 または 畳）
          <br /> ② 縦幅と横幅（cm）
          <br />
          <span
            css={css`
              color: red;
            `}
          >
            ※定規で測った長さでOK！
            <br />
          </span>
          *******************************************************
          <br />
        </div>
        <div
          id="err_message"
          css={css`
            color: red;
          `}
        ></div>
        {/** 間取り変換エリア */}
        <div className="madori-area">
          <div
            css={css`
              display: flex;
              flex-flow: column;
            `}
          >
            {/** 入力情報 */}
            <div className="input-madori">
              <figure className="wp-block-image is-resized">
                <img
                  decoding="async"
                  loading="lazy"
                  css={css`
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    margin-left: auto;
                    margin-right: auto;
                  `}
                  src="https://wp-next-elekibear-content.netlify.app/wp-content/uploads/2020/09/madori.png"
                  alt="Madori"
                  title="madori.png"
                  width="250"
                  height="250"
                />
              </figure>

              <div className="input-madori-area">
                面積：
                <br />
                {/** チェックボックス1 */}
                <input
                  type="radio"
                  name="areaChkBox"
                  defaultValue="area"
                  defaultChecked={true}
                />
                <input
                  type="number"
                  id="input_area"
                  defaultValue="20.0"
                  step="0.01"
                  className="input-madori-number"
                />
                <span
                  css={css`
                    vertical-align: bottom;
                  `}
                >
                  {' '}
                  [m^2]
                </span>
                <br />
                {/** チェックボックス2 */}
                <input
                  type="radio"
                  name="areaChkBox"
                  defaultValue="tatami_area"
                />
                <input
                  type="number"
                  id="input_area_tatami"
                  defaultValue="6.0"
                  step="0.1"
                  className="input-madori-number"
                />
                <span
                  css={css`
                    vertical-align: bottom;
                  `}
                >
                  {' '}
                  [畳]
                </span>
              </div>
              <div className="input-madori-height">
                縦幅：
                <input
                  type="number"
                  id="input_height"
                  defaultValue="1.00"
                  step="0.01"
                  className="input-madori-number"
                />
                <span
                  css={css`
                    vertical-align: bottom;
                  `}
                >
                  {' '}
                  [cm]
                </span>
              </div>

              <div className="input-madori-width">
                横幅：
                <input
                  type="number"
                  id="input_width"
                  defaultValue="1.00"
                  step="0.01"
                  className="input-madori-number"
                />
                <span
                  css={css`
                    vertical-align: bottom;
                  `}
                >
                  {' '}
                  [cm]
                </span>
              </div>
            </div>

            <br />

            <button
              id="btn"
              className="conv-button"
              onClick={() => PushConvSunpoButton()}
            >
              ↓寸法に変換！↓
            </button>

            <br />

            {/** 寸法変換後の表示エリア */}
            <div className="result-madori-area">
              <figure className="wp-block-image is-resized">
                <img
                  decoding="async"
                  loading="lazy"
                  css={css`
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    margin-left: auto;
                    margin-right: auto;
                  `}
                  src="https://wp-next-elekibear-content.netlify.app/wp-content/uploads/2020/09/madori.png"
                  alt="Madori"
                  title="madori.png"
                  width="250"
                  height="250"
                />
              </figure>
              <div className="result-madori-height">
                縦幅：
                <span
                  id="result_height"
                  className="result-madori-number"
                ></span>
                <span
                  css={css`
                    vertical-align: bottom;
                  `}
                >
                  {' '}
                  [m]
                </span>
              </div>
              <div className="result-madori-width">
                横幅：
                <span id="result_width" className="result-madori-number"></span>
                <span
                  css={css`
                    vertical-align: bottom;
                  `}
                >
                  {' '}
                  [m]
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ========== 通常の表示部分 ==========

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

  ${md(css`
    padding: 16px;
    margin: 0px;
  `)}
`;

/**
 * 対象とする記事種別
 */
const TargetPostType = 'tool';

/**
 * 間取り寸法変換くん
 * WordPress記事を無理やり移行したので汚いです...
 * @param props
 * @returns
 */
const MadoriConvToolPostPage: NextPage<PostBasePageProps> = (
  props: PostBasePageProps,
) => {
  const post: apiMst.Post = props.post;

  return (
    <>
      {' '}
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
              <MadoriToolContent />
              <RelatedPosts post={props.post} allPosts={props.allPosts} />
            </div>
          </>
        }
        allCategories={props.allCategories}
      />
    </>
  );
};
export default MadoriConvToolPostPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allPosts: any = null; // 使用しないのでnullで設定

  const allCategories = getAllCategories();
  const allCategoryIdIncludeChildInfo =
    getAllCategoryIdIncludeChildInfo(allCategories);
  const allTags: apiMst.Tags = getAllTags();

  // 記事データを設定
  // ツールは特殊なので固定で設定
  const slug: string = 'madoriconvtool';
  let post = getPostOrPageBySlug(slug);
  post = {
    id: slug,
    title: '【ツール】間取り図寸法変換くん 〜間取り図の比率から寸法を算出！〜',
    slug: slug,
    date: '2020-09-22 22:40:56',
    featuredImage: '',
    categories: [],
    tags: [],
  };

  // Contentは直接記載するので渡さない
  const postContent: string = '';

  // URLパス
  const postUrlPath = `/tool/${encodeURI(slug).toLowerCase()}`;

  // マークダウンファイルか？
  const isMarkdown: boolean = false;

  // サイドバーを表示するか？
  const isShowSidebar = true;

  return {
    props: {
      post,
      postContent,
      postUrlPath,
      isMarkdown,
      slug,
      allPosts,
      allCategories,
      allCategoryIdIncludeChildInfo,
      allTags,
      isShowSidebar,
    },
  };
};
