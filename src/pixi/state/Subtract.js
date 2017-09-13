import * as PIXI from 'pixi.js';
import Ship from '../components/Ship';
import { subtract } from '../../VectorMath';

class Add extends PIXI.Container {
  constructor() {
    super();
    this._addShips();
    this._drawLineBetween();
  }

  _addShips() {
    this.ship = new Ship();
    this.ship.setShipPosition(100, 100);
    this.addChild(this.ship);
    this._makeDraggable(this.ship);

    this.enemyShip = new Ship();
    this.enemyShip.setShipPosition(300, 300);
    this.enemyShip.tint = 0xff0004;
    this.addChild(this.enemyShip);
  }

  _makeDraggable(ship) {
    ship.interactive = true;
    ship.buttonMode = true;
    ship
      .on('pointerdown', event => {
        this.ship.data = event.data;
        this.ship.alpha = 0.5;
        this.ship.dragging = true;
      })
      .on('pointerup', () => {
        this.ship.alpha = 1;
        this.ship.dragging = false;
        this.ship.data = null;
      })
      .on('pointermove', () => {
        if (this.ship.dragging) {
          const newPosition = this.ship.data.getLocalPosition(this.parent);
          ship.setShipPosition(newPosition.x, newPosition.y);
          this._drawLineBetween();
        }
      });
  }

  _drawLineBetween() {
    if (this.line) this.removeChild(this.line);
    const [x, y] = subtract(this.ship.position, this.enemyShip.position);
    const lineGraphic = new PIXI.Graphics();
    lineGraphic.lineStyle(1, 0xff1300);
    lineGraphic.moveTo(0, 0);
    lineGraphic.lineTo(x, y);
    this.line = new PIXI.Sprite(lineGraphic.generateCanvasTexture());
    const text = new PIXI.Text(`(${x}, ${y})`, { fontSize: 16 });
    text.position.set(this.line.width / 2, this.line.height / 2);
    this.line.addChild(text);

    /**
     * Positioning in pixi needs to take into account the positioning is from top left so if the graphic is not drawn
     * from the top left (x/y are minus) then we need to move in order for the starting of the line to be in the
     * center of the the ship
     */
    const lineX = Math.sign(x) === -1 ? this.ship.x : this.ship.x - x;
    const lineY = Math.sign(y) === -1 ? this.ship.y : this.ship.y - y;
    this.line.position.set(lineX, lineY);

    this.addChild(this.line);
  }
}

export default Add;
