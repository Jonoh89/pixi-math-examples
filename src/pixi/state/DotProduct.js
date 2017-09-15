import * as PIXI from 'pixi.js';
import BaseState from './Base';
import Ship from '../components/Ship';
import * as VectorMath from '../../VectorMath';

class DotProduct extends BaseState {
  constructor() {
    super();
    this._addShips();
    this._createLineOfSightIndicator();
    this._setLineOfSightIndicator(false);
  }

  _addShips() {
    this.ship = new Ship();
    this.ship.setShipPosition(300, 100);
    this.addChild(this.ship);
    this._makeDraggable(this.ship);

    this.enemyShip = new Ship();
    this.enemyShip.setShipPosition(300, 300);
    this.enemyShip.tint = 0xff1f00;
    this.enemyShip.alpha = 0.5;
    this.enemyShip.facing = new PIXI.Point(0, 50); // down
    this.addChild(this.enemyShip);

    this.enemyFacing = new PIXI.Sprite(
      new PIXI.Graphics()
        .beginFill(0x000000)
        .drawCircle(0, 0, 5)
        .endFill()
        .generateCanvasTexture()
    );
    this.enemyFacing.anchor.set(0.5);
    this.enemyFacing.position.set(
      ...VectorMath.add(this.enemyShip.position, this.enemyShip.facing)
    );
    this.addChild(this.enemyFacing);
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
          const distanceBetween = new PIXI.Point(
            ...VectorMath.subtract(this.ship.position, this.enemyShip.position)
          );
          const canSee =
            VectorMath.dot(this.enemyShip.facing, distanceBetween) > 0;
          this._setLineOfSightIndicator(canSee);
        }
      });
  }

  _createLineOfSightIndicator() {
    const createBG = color =>
      new PIXI.Graphics()
        .beginFill(color)
        .drawRoundedRect(0, 0, 100, 50, 20)
        .endFill()
        .generateCanvasTexture();
    this.losTrueIndicatorBGs = {
      red: new PIXI.Sprite(createBG(0xff0019)),
      green: new PIXI.Sprite(createBG(0x00ff5b))
    };
  }

  _setLineOfSightIndicator(inLineOfSight) {
    if (this.losIndicator) {
      this.losIndicator.removeChildren();
      this.removeChild(this.losIndicator);
    }
    this.losIndicator = this.losTrueIndicatorBGs[
      inLineOfSight ? 'red' : 'green'
    ];
    this.losIndicator.position.set(250, 550);
    const losText = new PIXI.Text(inLineOfSight ? 'In LOS' : 'NOT in LOS', {
      fontSize: 16
    });
    losText.position.set(
      this.losIndicator.width / 2 - losText.width / 2,
      this.losIndicator.height / 2 - losText.height / 2
    );
    this.losIndicator.addChild(losText);
    this.addChild(this.losIndicator);
  }
}

export default DotProduct;
