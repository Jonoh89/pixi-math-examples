import * as PIXI from 'pixi.js';

class Ship extends PIXI.Sprite {
  constructor() {
    super(PIXI.utils.TextureCache.ship);
    this.anchor.set(0.5);
    const textBannerGraphic = new PIXI.Graphics()
      .beginFill(0xffffff, 0.8)
      .drawRect(0, 0, 50, 14)
      .endFill();
    const textBanner = new PIXI.Sprite(
      textBannerGraphic.generateCanvasTexture()
    );
    textBanner.anchor.set(0.5);
    this.addChild(textBanner);
    this._text = new PIXI.Text('0, 0', { fill: '#000', fontSize: 14 });
    this._text.anchor.set(0.5);
    this.addChild(this._text);
  }

  setShipPosition(x, y) {
    this.position.set(x, y);
    this._text.text = `${parseInt(x)}, ${parseInt(y)}`;
  }
}

export default Ship;
