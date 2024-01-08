import { Theme, css } from '@emotion/react';
import { styleWpMathJax } from './wp-mathjax';
import { styleWpPrism } from './wp-prism';
import { md } from 'style/media';

/**
 * wordpress投稿済の記事を表示するためのstyle
 * Globalに適用されてしまうため、最終的には移行したい
 * @param theme
 * @returns
 */
export const styleWordpress = (theme: Theme) => css`
  ${styleCommon(theme)}
  ${styleSpeech(theme)}
  ${styleToc(theme)}
  ${styleHeadTag(theme)}
  ${styleImage}
  ${styleTable(theme)}
  ${styleAppInfo}
  ${styleBlogCard(theme)}
  ${styleComic(theme)}
  ${styleRamenBox}
  ${stylePointBox(theme)}
  /** Plugins */
  ${styleWpPrism(theme)}
  ${styleWpMathJax(theme)}
`;

/** 共通 */
const styleCommon = (theme: Theme) => css`
  /** 全てのcontentに付与 */
  .entry-content > * {
    margin-bottom: 1.6em;
  }
  iframe {
    max-width: 100%;
  }

  /** ポップアップ画像用 */
  .popup-image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    min-height: 100vh;
    min-height: 100dvh;
    top: -50%;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: ${theme.zindex.imagePopup};
    overflow-y: scroll;
  }

  .popup-image {
    width: 80vw;
    max-width: 1000px !important;
  }

  /** margin強制削除 */
  .margin-none {
    margin: 0px !important;
  }
`;

/** 吹き出し */
const styleSpeech = (theme: Theme) => css`
  .speech-wrap {
    display: flex;
  }
  .sbp-r {
    flex-direction: row-reverse;
  }
  .speech-person {
    width: 12%;
    min-width: 12%;

    ${md(css`
      width: 18%;
      min-width: 18%;
    `)}
  }
  .speech-name {
    text-align: center;
    font-size: 13px;

    ${md(css`
      font-size: 10px;
    `)}
  }
  .speech-icon {
    margin: 0px;
  }
  .speech-icon img {
    width: 100%;
  }

  /** 吹き出し大枠 */
  .speech-balloon {
    height: 100%;
    position: relative;
    padding: 10px 14px;
    border-radius: 8px;
    max-width: calc(100% - 14%);
    box-shadow:
      rgba(0, 0, 0, 0.19) 0px 2px 10px,
      rgba(0, 0, 0, 0.23) 0px 2px 4px;
    line-height: 1.7;

    ${md(css`
      padding: 7px;
    `)}
  }
  .sbp-l .speech-balloon {
    background-color: ${theme.colors.speechLeftBackColor};
    border-color: ${theme.colors.speechLeftBorderColor};
    border: 2px solid ${theme.colors.speechLeftBorderColor};
    margin-left: 12px;
  }
  .sbp-r .speech-balloon {
    background-color: ${theme.colors.speechRightBackColor};
    border-color: ${theme.colors.speechRightBorderColor};
    border: 2px solid ${theme.colors.speechRightBorderColor};
    margin-right: 12px;
  }

  /** 吹き出し三角バック */
  .speech-balloon::before {
    content: '';
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    top: 10px;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
  }
  .sbp-l .speech-balloon::before {
    left: -11px;
    border-right: 11px solid ${theme.colors.speechLeftBorderColor};
  }
  .sbp-l .speech-balloon::after {
    left: -9px;
    border-right: 11px solid ${theme.colors.speechLeftBackColor};
  }

  /** 吹き出し三角フロント */
  .speech-balloon::after {
    content: '';
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    top: 10px;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
  }
  .sbp-r .speech-balloon::before {
    right: -11px;
    border-left: 11px solid ${theme.colors.speechRightBorderColor};
  }
  .sbp-r .speech-balloon::after {
    right: -9px;
    border-left: 11px solid ${theme.colors.speechRightBackColor};
  }
`;

/** 目次 */
const styleToc = (theme: Theme) => css`
  .toc {
    border: 1px solid ${theme.colors.primaryLightGray};
    border-radius: 10px;
    font-size: 0.9em;
    display: table;
    width: 70%;
    box-shadow:
      rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;

    ${md(css`
      width: 100%;
    `)}
  }
  .toc-center {
    margin: 1em auto;
  }
  .toc-title {
    font-size: 1.1em;
    text-align: center;
    display: block;
    padding: 8px 0px 0px 0px;
    border-radius: 10px 10px 0px 0px;
    background-color: ${theme.colors.primaryDarkGray};
    color: ${theme.colors.primaryWhite};
    height: 32px;
  }
  .toc-checkbox {
    display: none;
  }
  .toc-content {
    padding: 1em 1.6em;
    visibility: visible;
    padding-top: 0.6em;
    height: 100%;
    opacity: 1;
    font-weight: bold;

    ${md(css`
      padding: 0.5em 0.5em;
      padding-top: 0.2em;
    `)}
  }
  .toc-list ol {
    padding-bottom: 12px;
    padding-inline-start: 16px;
  }
  .toc-list ol ol {
    padding-top: 0px;
    padding-bottom: 0px;
    font-weight: normal;
  }
  .toc-list li {
    line-height: 1.8em;
  }
  .toc a {
    color: ${theme.colors.primaryDarkGray};
    text-decoration: none;
    cursor: pointer;
  }

  .toc-widget-current {
    background-color: ${theme.colors.primaryYellow};
  }
`;

/** h1 - h6 */
const styleHeadTag = (theme: Theme) => css`
  .entry-content h2,
  .entry-content h3,
  .entry-content h4,
  .entry-content h5,
  .entry-content h6 {
    margin-top: 60px;
    margin-bottom: 40px;
  }
  .entry-content h2 {
    font-size: 24px;
    color: ${theme.colors.primaryYellow};
    background-color: ${theme.colors.primaryDarkGray};

    padding: 18px 20px;
    border-left: 14px solid ${theme.colors.primaryBlue};
    border-radius: 2px 40px 2px 2px;

    ${md(css`
      font-size: 20px;
      padding: 0.6em 0.8em;
      border-left: 12px solid ${theme.colors.primaryBlue};
    `)}
  }
  .entry-content h4 {
    font-size: 19px;
    padding: 6px 14px;
    border-top: 3px solid ${theme.colors.primaryBlue};
    border-bottom: 3px solid ${theme.colors.primaryBlue};
    line-height: 1.5;

    ${md(css`
      font-size: 16px;
    `)}
  }
  .entry-content h5 {
    padding: 4px 6px;
    font-size: 18px;
    border-bottom: 3px solid rgb(31, 42, 130);
    border-image: linear-gradient(
        149deg,
        ${theme.colors.primaryBlue} 0%,
        ${theme.colors.simpleWhite} 200%
      )
      1 / 1 / 0 stretch;

    ${md(css`
      font-size: 16px;
    `)}
  }

  .entry-content h6 {
    padding: 4px 0px;
    font-size: 18px;
    margin-top: 12px;
    margin-bottom: 8px;

    ${md(css`
      font-size: 16px;
    `)}
  }
`;

/** 画像 */
const styleImage = css`
  .entry-content figure {
    margin-top: 0;
    margin-left: 0;
    margin-right: 0;
  }
  .wp-block-image img {
    display: block;
    box-sizing: border-box;
    height: auto;
    max-width: 100%;
  }
`;

/** テーブル */
const styleTable = (theme: Theme) => css`
  .entry-content table {
    border-collapse: collapse;
    border-spacing: 0;
    text-indent: initial;
  }
  .entry-content table th,
  .entry-content table td {
    border: 1px solid rgba(34, 34, 34, 0.5);
    padding: 6px;
  }
  /** カスタム 枠線有り */
  .eleki-table,
  .eleki-table-auto {
    min-width: 100px;
  }
  .eleki-table th,
  .eleki-table-auto th {
    background-color: ${theme.colors.primaryDarkGray};
    color: ${theme.colors.primaryWhite};
    border-color: ${theme.colors.primaryLightGray};
  }
  .eleki-table tr,
  .eleki-table-auto tr {
    background-color: transparent !important;
  }
  .eleki-table-auto {
    width: 100%;
  }
  /** カスタム 枠線無し */
  .eleki-table-border-none,
  .eleki-table-border-none-auto {
    min-width: 100px !important;
  }
  .eleki-table-border-none th,
  .eleki-table-border-none-auto th {
    background-color: transparent !important;
    border: none !important;
  }
  .eleki-table-border-none tr,
  .eleki-table-border-none-auto tr {
    background-color: transparent !important;
  }
  .eleki-table-border-none td,
  .eleki-table-border-none-auto td {
    border: none !important;
  }
  .eleki-table-border-none-auto {
    width: 100%;
  }
`;

/** アプリ情報 */
const styleAppInfo = css`
  .app-info-area {
    display: flex;
    align-items: flex-start;
    border: 1.2px solid;
    border-color: #808080;
    border-radius: 6px;
    padding: 14px;
    height: auto;
  }
  .app-icon-image {
    width: 128px;
    border-radius: 8px;
    margin-right: 18px;
  }
  .app-title-text {
    font-size: 16px;
  }
  .app-sub-text {
    font-size: 12px;
    color: #808080;
  }
  /** ストアバッジ */
  .store-badge-area {
    display: flex;
    align-items: center;
    height: 60px;
    margin-top: -2px;
  }
  .app-store-badge {
    width: 116px;
    max-width: 100%;
    height: auto;
  }
  .google-play-badge {
    width: 160px;
    max-width: 100%;
    height: auto;
  }
  .eleki-key {
    padding: 1px 3px;
    background-color: #f9f9f9;
    background-image: -moz-linear-gradient(center top, #eee, #f9f9f9, #eee);
    border: 1px solid #aaa;
    border-radius: 2px;
    box-shadow: 1px 2px 2px #ddd;
    font-family: inherit;
    font-size: 0.85em;
  }
`;

const styleBlogCard = (theme: Theme) => css`
  .a-wrap {
    text-decoration: none;
    display: block;
    color: ${theme.colors.primaryLightGray};
    padding: 1.5%;
    margin-bottom: 3%;
    transition: all 0.3s ease-in-out;
  }
  .blogcard-wrap {
    margin-left: auto;
    margin-right: auto;
    padding: 0;
    width: 95%;
    background-color: ${theme.colors.simpleWhite};
  }
  .blogcard {
    border-width: 1px;
    border-style: solid;
    padding: 1.6% 2.2% 2%;
    border: 1px solid ${theme.colors.primaryDarkGray};
    border-radius: px;
    line-height: 1.6;
    position: relative;
  }
  .blogcard-label {
    position: absolute;
    top: -18px;
    left: 16px;
    font-size: 13px;
    padding: 3px 0.6em;
    color: #fff;
    border-radius: 3px;
    letter-spacing: 0.7px;
  }
  .blogcard-thumbnail {
    float: left;
    margin-top: 3px;
    width: 160px;
    margin-right: 1.6%;
  }
  .blogcard-content {
    margin-left: 170px;
    max-height: 140px;
    min-height: 100px;
    overflow: hidden;
  }
  .blogcard-title {
    font-weight: bold;
    margin-bottom: 0.4em;
  }
  .blogcard-snippet {
    display: -webkit-box;
    overflow: hidden;
    font-size: 0.6em;
  }
  .blogcard-footer {
    font-size: 16px;
    line-height: 1.6;
    // 上手く表示されなかったので調整
    padding-top: 12px;
    height: 24px;
  }
  .blogcard-site {
    float: left;
    display: flex;
    align-content: center;
  }
  .blogcard-favicon {
    margin-right: 4px;
    margin-top: 2px;
  }
  .blogcard-date {
    float: right;
    display: flex;
    align-content: center;
  }
`;

/** 四コマ */
const styleCommicButton = (theme: Theme) => css`
  // ボタン共通
  background-color: ${theme.colors.primaryLightGray};
  color: ${theme.colors.primaryWhite};
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  position: relative;
  display: inline-block;
  border: 2px solid transparent;

  // 四コマボタン固有
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  &:hover {
    filter: opacity(0.7);
    opacity: 1;
  }
`;
const styleComic = (theme: Theme) => css`
  .comic-button-area {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
    height: 48px;
    font-size: 14px;

    ${md(css`
      height: 36px;
      font-size: 12px;
    `)}
  }
  .comic-button-item-side {
    width: 25%;
    ${styleCommicButton(theme)}
  }
  .comic-button-item-center {
    width: 35%;
    ${styleCommicButton(theme)}
  }
`;

/** ラーメンボックス */
const styleRamenBox = css`
  .ramenbox01 {
    position: relative;
    height: 550px;
    top: -200px;
    margin-bottom: 140px;
  }
  .ramenbox02 {
    position: sticky;
    height: 325px;
    top: 30px;
  }
  .ramenbox03 {
    position: absolute;
    height: 300px;
    top: 128px;
    margin-top: 200px !important;
  }
  .ramentop {
    position: absolute;
    top: 248px;
    left: 30px;
    z-index: 10;
  }
  .ramenbottom {
    position: sticky;
    top: 462px;
    z-index: 20;
  }
  .ramenmsg {
    margin-top: 320px;
    font-size: 30px;
    z-index: -10;
  }
`;

/** ポイント欄 */
const stylePointBox = (theme: Theme) => css`
  .roundbox {
    position: relative;
    margin: 40px auto;
    padding: 2%;
    border: 3px solid ${theme.colors.primaryBlue};
    border-radius: 6px;
  }

  /** 空白が入るのが嫌なので0pxに設定 */
  .roundbox p {
    margin-bottom: 0px;
  }

  .boxtitle {
    color: ${theme.colors.primaryBlue};
    background: #fff;
    padding: 0 0.5em;
    position: absolute;
    top: -0.7em;
    line-height: 1.4;
    margin-left: 0em;
    font-size: 1em;
    font-weight: bold;
  }
`;
