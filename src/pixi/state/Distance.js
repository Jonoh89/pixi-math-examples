import * as PIXI from 'pixi.js';
import BaseState from './Base';
import Ship from '../components/Ship';
import * as VectorMath from '../../VectorMath';

class Distance extends BaseState {
  constructor() {
    super();
    this._addShips();
    this._drawLineBetween(this.destinationShip);
    this._drawLineBetween(this.destinationShip2);
  }

  _addShips() {
    this.ship = new Ship();
    this.ship.setShipPosition(300, 100);
    this.addChild(this.ship);
    this._makeDraggable(this.ship);

    this.destinationShip = new Ship();
    this.destinationShip.setShipPosition(200, 300);
    this.destinationShip.tint = 0xff1f00;
    this.destinationShip.alpha = 0.5;
    this.addChild(this.destinationShip);

    this.destinationShip2 = new Ship();
    this.destinationShip2.setShipPosition(400, 300);
    this.destinationShip2.tint = 0xff1f00;
    this.destinationShip2.alpha = 0.5;
    this.addChild(this.destinationShip2);
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
          this._drawLineBetween(this.destinationShip);
          this._drawLineBetween(this.destinationShip2);
        }
      });
  }

  _drawLineBetween(destinationShip) {
    if (destinationShip.line) this.removeChild(destinationShip.line);
    const [x, y] = VectorMath.subtract(
      this.ship.position,
      destinationShip.position
    );
    const lineGraphic = new PIXI.Graphics();
    lineGraphic.lineStyle(1, 0xff1300);
    lineGraphic.moveTo(0, 0);
    lineGraphic.lineTo(x, y);
    destinationShip.line = new PIXI.Sprite(lineGraphic.generateCanvasTexture());

    const length = parseInt(
      VectorMath.distance(this.ship.position, destinationShip.position),
      10
    );
    const text = new PIXI.Text(length, { fontSize: 16 });
    text.position.set(
      destinationShip.line.width / 2,
      destinationShip.line.height / 2
    );
    destinationShip.line.addChild(text);

    /**
     * Positioning in pixi needs to take into account the positioning is from top left so if the graphic is not drawn
     * from the top left (x/y are minus) then we need to move in order for the starting of the line to be in the
     * center of the the ship
     */
    const lineX = Math.sign(x) === -1 ? this.ship.x : this.ship.x - x;
    const lineY = Math.sign(y) === -1 ? this.ship.y : this.ship.y - y;
    destinationShip.line.position.set(lineX, lineY);

    this.addChild(destinationShip.line);
  }
}

export default Distance;
