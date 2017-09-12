import * as PIXI from 'pixi.js';

const buttonGraphic = new PIXI.Graphics()
  .beginFill(0x00b0ff, 0.8)
  .drawRoundedRect(0, 0, 100, 50, 20)
  .endFill();

class Button extends PIXI.Sprite {
  constructor({ text = '' }) {
    super(buttonGraphic.generateCanvasTexture());
    this.interactive = true;
    this.buttonMode = true;
    this.text = new PIXI.Text(text, { fill: 0xffffff, fontSize: 14 });
    this.text.position.set(
      this.width / 2 - this.text.width / 2,
      this.height / 2 - this.text.height / 2
    );
    this.addChild(this.text);
  }
}

export default Button;
