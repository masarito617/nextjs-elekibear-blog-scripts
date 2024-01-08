import Head from 'next/head';

/**
 * SEO用のheadメタ情報
 * @param props
 * @returns
 */
const HeadMeta = (props: {
  title: string;
  description: string;
  url: string;
  siteName: string;
  type: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
}) => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:url" content={props.url} />
      <meta property="og:title" content={props.title} />
      <meta property="og:site_name" content={props.siteName} />
      <meta property="og:description" content={props.description} />
      <meta property="og:type" content={props.type} />
      <meta property="og:image" content={props.imageUrl} />
      <meta property="og:image:width" content={String(props.imageWidth)} />
      <meta property="og:image:height" content={String(props.imageHeight)} />
    </Head>
  );
};
export default HeadMeta;
