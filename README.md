## 都会のエレキベア（Next.js製ブログサイト） サンプルコード
* <a href="https://elekibear.com">都会のエレキベア</a> ブログサイトの公開用サンプルコードになります。
  * 個人での学習目的で利用するのは全く問題ないですが、プロジェクトを丸ごと複製して商用利用するのはご容赦ください。
  * ブログ記事データ等は含めておらず、<a href="/src/settings">src/settings</a>配下のファイルにダミーデータを設定しています。
  * 広告ID等、一部データは省いてあります。
* Next.jsで開発、SSGを使用し、静的サイトとして動作します。（Netlifyへのデプロイを想定）
* WordPressで管理していた記事を移植したため、text記事と現行のMarkdown記事が混在しています。

<img width="600px" src="https://github.com/masarito617/nextjs-elekibear-blog-scripts/assets/77447256/e06ca245-ce9c-4c66-9236-9660df6815d8">
<br><br>

### 使用方法
```bash
# 開発モードで起動する
npm run dev

# 本番モードで起動する
npm run start

# ビルドを行う
# next-sitemapによるsitemap.xml、robots.txtの作成も同時に行う
npm run build

# ESLint、Prettierによるチェック行う
npm run check

# ESLint、Prettierによるテキスト整形を行う
npm run format

# storybook画面を起動する
npm run storybook

# 執筆モードで起動する（開発モード & Markdownホットリロード）
# ホットリロードは tools/express-post-watcher を起動して監視している
npm run watch

# 新規Markdown記事ファイル作成
# 画面指示通りにslugを入力すると data/posts-md/preview フォルダ内に作成される
sh tools/create_new_post.sh

# Markdown記事ファイルのアップロード
# Netlifyに画像をアップロードし、プレビューファイルを正規のパスに移動する
sh tools/upload_new_post.sh -s '【slug名】'
```

#### 記事執筆の流れ
1. <code>npm run watch</code>を実行し、執筆モードで起動する
2. <code>tools/create_new_post.sh</code>を実行し、新規Markdown記事ファイルを作成する
3. <code>data/posts-md/preview</code>フォルダ内に作成されたMarkdownファイルを編集して執筆する<br>※画像ファイルは<a href="https://github.com/masarito617/electron-image-resizer">画像リサイズツール</a>等を使用して<code>public/netlify-contents/uploads/content</code>配下に格納して進める
4. <code>tools/upload_new_post.sh</code>を実行して画像のアップロードとMarkdown記事ファイルを正規パスへの移動を行う
5. 差分を確認してGitHubへpushする

#### Markdownの独自記法について
* 主に<a href="/src/parser/markdown/CustomCodeBlock.tsx">コードブロックをカスタムする形</a>で独自記法を追加しています。
* <a href="/data/vscode-settings/keybindings.json">keybindings.json</a> に独自記法のキーボードショートカット例を設定しています。

<br>

### 主な使用ライブラリ

| 該当箇所 | ライブラリ |
----|---- 
| フレームワーク | Next.js 13.4|
| スタイリング | Emotion、React Icons |
| 記事ファイル変換 | <code>Text記事</code>：cheerio<br><code>Markdown記事</code>：react-markdown、gray-matter、rehype-raw |
| 記事コンテンツ | Prism.js、p5.js、MathJax、Codepen |
| sitemap.xml、robots.txt作成 | next-sitemap |
| 開発環境 | ESLint、Storybook |

<br>

### ページルーティング

| URLパス | ページ |
----|---- 
| / | 記事一覧ページ |
| /post/[slug] | 記事ページ<br>※WordPressの時は<code>/[slug]</code>のみのパスだったため、301リダイレクトに設定 |
| /page/[slug] | 固定記事ページ |

<br>

### フォルダ構成　

#### [全体]
```
.
├── data
│   ├── db
│   ├── posts
│   └── posts-md
│       └── preview
├── public
│   ├── dummy
│   ├── favicon
│   ├── img
│   └── lib
├── src
│   ├── api
│   ├── common
│   ├── components
│   │   ├── common
│   │   ├── page
│   │   ├── templates
│   │   └── widgets
│   ├── pages
│   ├── parser
│   ├── settings
│   ├── style
│   ├── theme
│   └── types
└── tools
```

| フォルダ名 | 内容 |
----|---- 
| data | マスタデータ(CSV)、記事ファイル(Text or Markdown) |
| public | 画像や外部スクリプトファイル等 |
| src | スクリプト |
| tools | 開発や記事執筆に使用するツール群 |

<br>

#### [src配下]

```
src
├── api
├── common
├── components
│   ├── common
│   ├── page
│   ├── templates
│   └── widgets
├── pages
├── parser
├── settings
├── style
├── theme
└── types
```

| フォルダ名 | 内容 |
----|---- 
| api | データ操作関連の処理(CSV、Markdown) |
| common | スクリプト全体の共通処理 |
| components | UIコンポーネント群<br><code>common</code>：共通UIコンポーネント<br><code>page</code>：ページ固有コンポーネント<br><code>templates</code>：レイアウトコンポーネント<br><code>widgets</code>：サイドバーウィジェット<br> |
| pages | ページ起点 |
| parser | データ変換関連の処理(Markdown) |
| settings | 設定ファイル |
| style | スクリプト全体の共通style群 |
| theme | Emotionスタイルテーマ |
| types | 型定義ファイル |

<br>

### マスタデータ構成
* <code>date/db</code>内に<code>mst_posts</code>、<code>mst_terms</code>、<code>mst_term_relationships</code>の3ファイルで管理。
* Markdownの記事データについてはファイル内に情報を入力しているため、<code>mst_posts</code>、<code>mst_term_relationships</code>は未使用。

#### mst_posts<br>記事マスタ
| カラム名 | 概要 |
| - | - |
| id | 投稿ID |
| post_date | 投稿日 |
| post_title | タイトル |
| post_name | 投稿名(slug) |
| post_modified | 更新日 |
| post_type | 投稿種別 |
| featured_image | アイキャッチ画像 |

#### mst_terms<br>分類マスタ
| カラム名 | 概要 |
| - | - |
| id | 分類ID |
| name | 名前 |
| slug | スラッグ |
| taxonomy | 分類種別(カテゴリ or タグ) |
| parent | 親ID |

#### mst_term_relationships<br>記事、分類マスタの紐付け
| カラム名 | 概要 |
| - | - |
| post_id | 投稿データのID |
| term_id | 分類ID |

