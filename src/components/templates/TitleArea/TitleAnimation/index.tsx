import { Global, css } from '@emotion/react';
import dynamic from 'next/dynamic';
import p5Types from 'p5';
import { useEffect } from 'react';
import { TitleAnimation } from './Animation';
import { ElementUtil } from 'common/ElementUtil';
import { TitleAreaUtil } from 'components/templates/TitleArea/TitleAreaUtil';

const styleGlobalP5js = css`
  // ヘッダ領域に合わせるため追加
  .react-p5 {
    position: absolute !important;
  }
`;

// スクロールにより要素が画面外に抜けた場合、アニメーション停止する
const checkDisplayByScroll = () => {
  // window範囲
  const scrollTop = window.scrollY;
  const scrollBottom = scrollTop + window.innerHeight;

  // 要素の範囲
  const targetTop = TitleAreaUtil.offsetTop();
  const targetBottom = targetTop + TitleAreaUtil.height();

  // 要素が画面内に入っていなければアニメーションを止める
  if (scrollBottom > targetTop && scrollTop < targetBottom) {
    TitleAnimation.SetIsStopAnimation(false);
  } else {
    TitleAnimation.SetIsStopAnimation(true);
  }
};

// Using it in an SSR environment (Next.js or Gatsby)
// https://www.npmjs.com/package/react-p5?activeTab=readme
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
});

export const TitleAnimationComponent = () => {
  // スクロール検知イベントを追加
  useEffect(() => {
    window.addEventListener('scroll', checkDisplayByScroll);
    return () => window.removeEventListener('scroll', checkDisplayByScroll);
  }, []);

  const preload = (p5: p5Types) => {};

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    // ローディング非表示にする
    ElementUtil.addClassById(
      TitleAreaUtil.titleLoadingId,
      TitleAreaUtil.titleLoadingFadeOutClassName,
    );
    TitleAnimation.StartSketch(p5, canvasParentRef, () => {
      // タイトルロゴ表示
      ElementUtil.showById(TitleAreaUtil.titleLogoImageId);
    });
  };

  const draw = (p5: p5Types) => {
    TitleAnimation.UpdateSketch(p5);
  };

  const windowResized = (p5: p5Types) => {
    TitleAnimation.ResizedSketch(p5);
  };

  return (
    <>
      <Global styles={styleGlobalP5js} />
      <Sketch
        preload={preload}
        setup={setup}
        draw={draw}
        windowResized={windowResized}
      />
    </>
  );
};
export default TitleAnimationComponent;
