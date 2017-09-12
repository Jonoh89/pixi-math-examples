import * as PIXI from 'pixi.js';

class Grid extends PIXI.Sprite {
  constructor({ width = 600, height = 600 } = {}) {
    const gridGraphic = new PIXI.Graphics().lineStyle(1, 0x3d3d3d);
    for (let w = 0; w < width; w += 50) {
      gridGraphic.moveTo(w, 0);
      gridGraphic.lineTo(w, height);
    }
    for (let h = 0; h < height; h += 50) {
      gridGraphic.moveTo(0, h);
      gridGraphic.lineTo(width, h);
    }
    super(gridGraphic.generateCanvasTexture());
  }
}

export default Grid;
