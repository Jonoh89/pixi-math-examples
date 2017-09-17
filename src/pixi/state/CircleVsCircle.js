import * as PIXI from 'pixi.js';
import BaseState from './Base';
import Ship from '../components/Ship';
import * as VectorMath from '../../VectorMath';

class BoundingCircle {
  constructor(center, radius) {
    this.center = center;
    this.radius = radius;
  }
}

class CircleVsCircle extends BaseState {
  constructor() {
    super();
    this._createShips();
    this._createCollisionIndicator();
  }

  _createShips() {
    const ship1 = new Ship();
    ship1.position.set(200, 300);
    this._makeDraggable(ship1);
    ship1.collisionArea = new BoundingCircle(
      new PIXI.Point(ship1.width / 2, ship1.height / 2),
      ship1.width / 2
    );
    this.ship1 = this.addChild(ship1);

    const ship2 = new Ship();
    ship1.position.set(400, 300);
    ship2.tint = 0xff0020;
    this._makeDraggable(ship2);
    ship2.collisionArea = new BoundingCircle(
      new PIXI.Point(ship1.width / 2, ship1.height / 2),
      ship1.width / 2
    );
    this.ship2 = this.addChild(ship2);
  }

  _makeDraggable(ship) {
    ship.interactive = true;
    ship.buttonMode = true;
    ship
      .on('pointerdown', event => {
        ship.data = event.data;
        ship.alpha = 0.5;
        ship.dragging = true;
      })
      .on('pointerup', () => {
        ship.alpha = 1;
        ship.dragging = false;
        ship.data = null;
      })
      .on('pointermove', () => {
        if (ship.dragging) {
          const newPosition = ship.data.getLocalPosition(this.parent);
          ship.setShipPosition(newPosition.x, newPosition.y);
        }
      });
  }

  _createCollisionIndicator() {
    const createBG = color =>
      new PIXI.Graphics()
        .beginFill(color)
        .drawRoundedRect(0, 0, 100, 50, 20)
        .endFill()
        .generateCanvasTexture();
    const normal = new PIXI.Sprite(createBG(0xff0019));
    normal.addChild(new PIXI.Text('No Col'));

    const collided = new PIXI.Sprite(createBG(0x00ff5b));
    collided.addChild(new PIXI.Text('Col'));

    [normal, collided].forEach(s => s.position.set(250, 550));
    this.losCollisionMessages = { normal, collided };
    this.collisionMessage = this.addChild(normal);
  }

  _sphereIntersection(shipA, shipB) {
    // Construct a vector between centers, and get length squared
    const centerVector = new PIXI.Point(
      ...VectorMath.subtract(
        new PIXI.Point(
          ...VectorMath.add(shipB.position, shipB.collisionArea.center)
        ),
        new PIXI.Point(
          ...VectorMath.add(shipA.position, shipA.collisionArea.center)
        )
      )
    );
    // Recall that the length squared of v is the same as v dot v
    const distSquared = VectorMath.dot(centerVector, centerVector);
    // Is distSquared < sum of radii squared?
    return (
      distSquared <
      (shipA.collisionArea.radius + shipB.collisionArea.radius) *
        (shipA.collisionArea.radius + shipB.collisionArea.radius)
    );
  }

  update() {
    this.removeChild(this.collisionMessage);
    this.collisionMessage = this._sphereIntersection(this.ship1, this.ship2)
      ? this.addChild(this.losCollisionMessages.collided)
      : this.addChild(this.losCollisionMessages.normal);
  }
}

export default CircleVsCircle;
