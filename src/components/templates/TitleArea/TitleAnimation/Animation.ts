import p5Types from 'p5';
import { TitleAreaUtil } from '../TitleAreaUtil';
import { MathUtil } from 'common/MathUtil';

/**
 * タイトルアニメーション
 * p5jsを使用
 */
export class TitleAnimation {
  private static finishedCallback: () => void; // アニメーション終了コールバック

  private static bills: Bill[]; // 生成するビル配列
  private static particles: Particle[]; // 生成するパーティクル配列
  private static isInitBills: boolean; // ビルを初期化済か？
  private static isShowBillWindow: boolean; // ビルの窓を表示済か？
  private static backYellowRound: number = 0; // 黄色背景の円の大きさ

  private static isStopAnimation: boolean; // アニメーションを停止させるか？
  private static readonly FrameRate: number = 30; // フレームレート

  /**
   * 開始処理
   */
  public static StartSketch(
    p5: p5Types,
    canvasParentRef: Element,
    finishedCallback: () => void,
  ) {
    this.finishedCallback = finishedCallback;

    const parentWidth = TitleAreaUtil.width();
    const parentHeight = TitleAreaUtil.height();

    // アニメーション停止フラグをfalse
    this.isStopAnimation = false;

    // 横幅を保持
    this.prevWidth = parentWidth;

    // フレームレート設定
    p5.frameRate(this.FrameRate);

    // Canvas設定
    const canvas = p5
      .createCanvas(parentWidth, parentHeight)
      .parent(canvasParentRef);

    // ビル生成
    this.InitBills(p5, parentWidth, parentHeight);
  }

  /**
   * 更新処理
   */
  public static UpdateSketch(p5: p5Types) {
    const parentWidth = TitleAreaUtil.width();
    const parentHeight = TitleAreaUtil.height();

    // アニメーション停止フラグが設定されていたら処理を行わない
    if (this.isStopAnimation) {
      return;
    }
    // 初期化していなければ処理を行わない
    if (!this.isInitBills || this.bills == null) {
      return;
    }

    // まだビルの窓を表示していない場合
    if (!this.isShowBillWindow) {
      // ビルが全て目的の高さに達しているか？
      let isAllTargetHeight: boolean = true;
      for (let i = 0; i < this.bills.length; i++) {
        if (!this.bills[i].isTargetHeight()) {
          isAllTargetHeight = false;
          break;
        }
      }
      // 全て伸びきったら一定秒後に窓を表示させる
      if (isAllTargetHeight) {
        window.setTimeout(() => {
          // 窓表示フラグON
          this.isShowBillWindow = true;

          // 背景パーティクルを生成する
          const particleCount: number = parentWidth / 250; // パーティクル数
          for (let i = 0; i < particleCount; i++) {
            const circle = new Particle(p5, parentWidth, parentHeight);
            circle.Start();
            this.particles.push(circle);
          }

          // アニメーション終了コールバックを呼び出す
          if (this.finishedCallback != null) {
            this.finishedCallback();
          }
        }, 150);
      }
    }

    // 更新処理
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].Update();
    }
    for (let i = 0; i < this.bills.length; i++) {
      if (this.isShowBillWindow) {
        this.bills[i].setIsShowWindow(true);
      }
      this.bills[i].Update();
    }

    // 描画処理
    p5.noStroke();
    // 灰色で塗りつぶす
    p5.background(59, 76, 86);
    if (this.isShowBillWindow) {
      // 窓が表示されている場合、黄色背景を円形で表示させる
      if (this.backYellowRound <= parentWidth * 2) {
        this.backYellowRound += parentWidth * 0.0035 * p5.deltaTime;
      }
      p5.fill(255, 245, 0);
      p5.circle(parentWidth / 2, parentHeight, this.backYellowRound);
    }
    // オブジェクト描画
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].Draw();
    }
    for (let i = 0; i < this.bills.length; i++) {
      this.bills[i].Draw();
    }
  }

  private static resizeTimer: number;
  private static prevWidth: number;

  /**
   * リサイズ処理
   */
  public static ResizedSketch(p5: p5Types) {
    // アニメーション停止フラグが設定されていたら処理を行わない
    if (this.isStopAnimation) {
      return;
    }
    // 100px以上変更していない場合には処理を行わない
    if (Math.abs(this.prevWidth - TitleAreaUtil.width()) < 100) {
      return;
    }
    // timerを使用して一定秒数ごとに処理させる
    if (this.resizeTimer > 0) {
      window.clearTimeout(this.resizeTimer);
    }
    this.resizeTimer = window.setTimeout(() => {
      // サイズを再設定
      const parentWidth = TitleAreaUtil.width();
      const parentHeight = TitleAreaUtil.height();
      console.log('resize: ' + parentWidth + ' ' + parentHeight);
      p5.resizeCanvas(parentWidth, parentHeight);
      // 横幅を保持
      this.prevWidth = parentWidth;
      // ビルを再生成
      this.InitBills(p5, parentWidth, parentHeight);
    }, 500);
  }

  /**
   * ビル初期化処理
   */
  private static InitBills(
    p5: p5Types,
    parentWidth: number,
    parentHeight: number,
  ) {
    // 初期化フラグをOFF
    this.isInitBills = false;

    // 関連する変数を初期化
    this.bills = [];
    this.particles = [];
    this.backYellowRound = 0;

    // ビルのランダム値を設定
    const billWidth: number = Math.max(80, parentWidth / 10); // ビルの幅：ヘッダ幅/10(最小80px)
    const billSpace: number = billWidth * 0.8; // ビルの間隔：幅*0.8で重ねる
    const billCount: number = parentWidth / billSpace + 1; // ビルの数：間隔で割った数値+1
    for (let i = 0; i < billCount; i++) {
      // ビル生成
      const bill: Bill = new Bill(
        p5,
        parentWidth,
        parentHeight,
        billWidth * MathUtil.getRandom(0.8, 1.2), // 横幅：若干ブレを持たせる
        parentHeight * MathUtil.getRandom(0.45, 0.75), // 高さ：ヘッダ高さ*0.45〜0.75
        i * billSpace,
        Math.random() < 0.7 ? BillWindowType.Rect : BillWindowType.Circle, // ビルの窓タイプ
        MathUtil.getRandom(0, 500),
      ); // 一定時間出現を待機させる
      // 開始処理
      bill.Start();
      this.bills.push(bill);
    }

    // ランダムにシャッフルする
    this.bills.sort(() => Math.random() - 0.5);

    // 窓表示フラグ初期化
    this.isShowBillWindow = false;

    // 初期化フラグをON
    this.isInitBills = true;
  }

  /**
   * アニメーションを停止させる
   */
  public static SetIsStopAnimation(value: boolean) {
    this.isStopAnimation = value;
  }
}

/**
 * ビルクラス
 */
class Bill {
  private p: p5Types;
  private readonly parentWidth: number;
  private readonly parentHeight: number;

  // ビル情報
  private readonly width: number; // 横幅
  private readonly targetHeight: number; // 目的の高さ
  private readonly posX: number; // 出現させるX位置
  private height: number; // 高さ
  private addHeight: number; // フレーム毎に加える高さ
  private totalTime: number; // 更新中の累計時間

  // 待機情報
  private readonly waitTime: number; // 待機させる時間
  private isWait: boolean; // 待機中か？

  // 窓情報
  private isShowWindow: boolean; // 窓を表示するか？(外から設定される)
  private readonly windowType: BillWindowType; // 窓のタイプ(0:四角, 1:丸)
  private windowWidth: number; // 窓の幅
  private windowHeight: number; // 窓の高さ
  private windowHeightSpace: number; // 窓の高さの間隔
  private windowHeightTopOffset: number; // 窓の高さのオフセット
  private windowCountX: number; // 窓のX方向の個数
  private windowCountY: number; // 窓のY方向の個数
  private windowHideArray: number[]; // 非表示にする窓index

  constructor(
    p: p5Types,
    parentWidth: number,
    parentHeight: number,
    width: number,
    targetHeight: number,
    posX: number,
    windowType: BillWindowType,
    waitTime: number,
  ) {
    this.p = p;
    this.parentWidth = parentWidth;
    this.parentHeight = parentHeight;
    this.width = width;
    this.targetHeight = targetHeight;
    this.posX = posX;
    this.windowType = windowType;
    this.waitTime = waitTime;
  }

  public Start() {
    // ビルの情報を設定
    this.height = 0;
    this.addHeight = 0.5;
    this.addHeight = 0.6 * (this.targetHeight / 100);
    this.totalTime = 0;

    // 窓の情報を設定
    switch (this.windowType) {
      case BillWindowType.Rect: // 四角
        this.windowWidth = this.width / 3 - this.width / 4; // X方向に3つ設定するとしていい感じに調整
        this.windowHeight = MathUtil.getRandom(30, 50); // 決め内で高さは決める
        this.windowHeightSpace = MathUtil.getRandom(10, 20); // 高さの間隔
        this.windowHeightTopOffset = this.windowHeight * 0.8; // オフセット
        break;
      case BillWindowType.Circle: // 円
        this.windowWidth = MathUtil.getRandom(this.width / 10, this.width / 9); // ランダムに設定
        this.windowHeight = this.windowWidth; // 円の場合は横幅と同じ
        this.windowHeightSpace = MathUtil.getRandom(10, 15); // 高さの間隔
        this.windowHeightTopOffset = this.windowHeight * 1.2; // オフセット
        break;
    }
    this.windowCountX = 3; // X方向の数は3固定
    this.windowCountY =
      this.targetHeight / (this.windowHeight + this.windowHeightSpace) + 1; // Y方向は入り切る数分

    // 隠す窓のindexをランダムで決める
    this.windowHideArray = [];
    for (let i = 0; i < this.windowCountX * this.windowCountY; i++) {
      if (MathUtil.getRandom(0, 10) < 3) {
        // とりあえず3割
        this.windowHideArray.push(i);
      }
    }

    // 指定時間待機させる
    this.isWait = true;
    window.setTimeout(() => {
      this.isWait = false;
    }, this.waitTime);
  }

  public Update() {
    // 待機中は何もしない
    if (this.isWait) return;

    // 目的の高さになるまで加える
    if (!this.isTargetHeight()) {
      // 1秒間に120px伸びるとしてイージングを設定
      const t = MathUtil.easeOutQuad(
        this.totalTime / 1000 / (this.targetHeight / 120),
      );
      this.height += this.addHeight * this.p.deltaTime * t;
      this.height = Math.min(this.height, this.targetHeight);
      this.totalTime += this.p.deltaTime;
    }
  }

  public Draw() {
    // 待機中は何もしない
    if (this.isWait) return;

    // ビル描画
    this.p.fill(34, 34, 34);
    this.p.rect(
      this.posX - this.width / 2, // X: 原点が左上のため、指定位置から横幅の半分を引いた位置にする
      this.parentHeight - this.height, // Y: 下から伸びるように見せるため、ヘッダー高さから縦幅を引いた位置にする
      this.width,
      this.height,
    );
    // フラグが設定されるまでは窓は表示しない
    if (!this.isShowWindow) {
      return;
    }
    // 窓リスト描画
    this.p.fill(242, 242, 242);
    let index = 0;
    for (let x = 0; x < this.windowCountX; x++) {
      for (let y = 0; y < this.windowCountY; y++) {
        // 非表示に設定されていない場合
        if (this.windowHideArray.indexOf(index) === -1) {
          // 窓を描画
          switch (this.windowType) {
            case BillWindowType.Rect: // 四角
              this.p.rect(
                this.posX +
                  ((x - 1) * this.width) / this.windowCountX -
                  this.windowWidth / 2, // X: (-1,0,1)に横幅をかけて窓の半分の幅を引く
                this.parentHeight -
                  this.height +
                  this.windowHeightTopOffset +
                  y * (this.windowHeight + this.windowHeightSpace), // Y: ビルの位置+オフセット+個数分
                this.windowWidth,
                this.windowHeight,
              );
              break;
            case BillWindowType.Circle: // 円
              this.p.circle(
                this.posX + (((x - 1) * this.width) / this.windowCountX) * 0.7, // 四角より気持ち詰める
                this.parentHeight -
                  this.height +
                  this.windowHeightTopOffset +
                  y * (this.windowHeight + this.windowHeightSpace) +
                  this.windowWidth / 2, // Y: ビルの位置+オフセット+個数分,
                this.windowWidth,
              );
              break;
          }
        }
        index++;
      }
    }
  }

  public isTargetHeight(): boolean {
    return this.height > this.targetHeight - 1.0;
  }

  public setIsShowWindow(isShowWindow: boolean) {
    this.isShowWindow = isShowWindow;
  }
}

/**
 * ビルの窓タイプ
 */
const BillWindowType = {
  Rect: 0, // 四角
  Circle: 1, // 円
} as const;
type BillWindowType = (typeof BillWindowType)[keyof typeof BillWindowType];

/**
 * パーティクル(ドット円)クラス
 */
class Particle {
  private p: p5Types;
  private readonly parentWidth: number;
  private readonly parentHeight: number;

  private x: number;
  private y: number;
  private r: number;
  private a: number;
  private initX: number;
  private upSpeed: number;
  private shakeSpeed: number;
  private shake: number;
  private scale: number;
  private frameCount: number;

  constructor(p: p5Types, parentWidth: number, parentHeight: number) {
    this.p = p;
    this.parentWidth = parentWidth;
    this.parentHeight = parentHeight;
  }

  public Start() {
    // ランダムで位置を設定
    this.x = MathUtil.getRandom(0, this.parentWidth);
    this.y = MathUtil.getRandom(0, this.parentHeight);
    this.r = MathUtil.getRandom(12, 25);
    this.a = 0;
    this.initX = this.x;
    this.upSpeed = MathUtil.getRandom(0.03, 0.09); // １ミリ秒ごとの移動距離
    this.shakeSpeed = 0.003;
    this.shake = MathUtil.getRandom(0, 10);
    this.frameCount = Math.random();
  }

  public Update() {
    this.frameCount += this.shakeSpeed * this.p.deltaTime;
    this.x = this.initX + this.shake * Math.sin(this.frameCount);
    // 上方向に移動させる
    this.y -= this.upSpeed * this.p.deltaTime;
    if (this.y < -this.r / 2) {
      this.y = this.parentHeight;
    }
    this.scale =
      1 - MathUtil.easeOutQuad(Math.max(0, this.y / (this.parentHeight + 100))); // 徐々に大きくする
    this.a = Math.min(255, this.a + 50); // フェードイン
  }

  public Draw() {
    this.p.stroke(34, 34, 34, this.a);
    this.p.noFill();
    this.p.circle(this.x, this.y, this.r * this.scale);
  }
}
