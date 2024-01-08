/** @type {import('next').NextConfig} */
const nextConfig = {
  // build時のexport設定、SSGを手動出力する際にtrueに指定する
  // output: 'export',

  // trueにするとuseEffectが2回呼ばれる
  // p5jsで複数canvas描画されるためfalseに指定
  reactStrictMode: false,

  // Emotion有効化
  compiler: (() => {
    let compilerConfig = {
      emotion: true,
    };
    return compilerConfig;
  })(),
  // next/image で参照を許可する外部ドメイン情報
  images: {
    domains: [
      'elekibear.com',
      'localhost',
      'wp-next-elekibear-content.netlify.app',
    ],
  },
  // Netlifyの public/_redirects にて設定したためコメントアウト
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:slug',
  //       destination: '/post/:slug',
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
