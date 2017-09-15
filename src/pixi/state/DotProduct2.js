import * as PIXI from 'pixi.js';
import BaseState from './Base';
import Ship from '../components/Ship';
import * as VectorMath from '../../VectorMath';

class DotProduct2 extends BaseState {
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
    this.enemyShip.facing_n = new PIXI.Point(
      ...VectorMath.normalize(new PIXI.Point(0, 50))
    ); // down
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

    const directionDeg = 90;
    const length = 200;
    const angleDeg = directionDeg - 70;
    const angle = angleDeg * PIXI.DEG_TO_RAD;
    const x1 = Math.cos(angle) * length;
    const y1 = Math.sin(angle) * length;
    const x2 = Math.cos(-angle) * length;
    const y2 = Math.sin(-angle) * length;

    const angleOfViewGraphic = new PIXI.Graphics()
      .beginFill('#46B864', 0.8)
      .lineStyle(1, 0x000000)
      .moveTo(0, 0)
      .lineTo(x1, y1)
      .quadraticCurveTo(0, length, -x2, -y2)
      .lineTo(0, 0)
      .endFill();
    this.angleOfView = new PIXI.Sprite(
      angleOfViewGraphic.generateCanvasTexture()
    );
    this.angleOfView.anchor.set(0.5, 0);
    this.angleOfView.position.set(300, 300);
    this.addChild(this.angleOfView);
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
          const distanceBetween_n = new PIXI.Point(
            ...VectorMath.normalize(
              new PIXI.Point(
                ...VectorMath.subtract(
                  this.ship.position,
                  this.enemyShip.position
                )
              )
            )
          );
          const angle =
            PIXI.RAD_TO_DEG *
            Math.acos(
              VectorMath.dot(this.enemyShip.facing_n, distanceBetween_n)
            );
          console.log(angle);
          this._setLineOfSightIndicator(angle <= 70);
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

export default DotProduct2;
