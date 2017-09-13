import * as PIXI from 'pixi.js';
import BaseState from './Base';
import Ship from '../components/Ship';
import Button from '../components/Button';
import { multiplyScalar } from '../../VectorMath';

const defaultVelocity = new PIXI.Point(2, 4);

class ScalarMultiplication extends BaseState {
  constructor() {
    super();
    this._addShip();
    this._addButton();
    this.speed = 1;
    this._addSpeedText();
    this.velocity = defaultVelocity;
  }

  _addShip() {
    this.ship = new Ship();
    this.ship.setShipPosition(200, 200);
    this.ship.forwardX = true;
    this.ship.forwardY = true;
    this.addChild(this.ship);
  }

  _addButton() {
    const addButton1 = new Button({ text: '-0.1 Speed' });
    addButton1.on('pointerdown', () => {
      this.speed -= 0.1;
      const [x, y] = multiplyScalar(defaultVelocity, this.speed);
      this.velocity = new PIXI.Point(x, y);
      this._updateSpeedText();
    });
    addButton1.position.set(50, 550);
    this.addChild(addButton1);

    const addButton2 = new Button({ text: '+0.1 Speed' });
    addButton2.on('pointerdown', () => {
      this.speed += 0.1;
      const [x, y] = multiplyScalar(defaultVelocity, this.speed);
      this.velocity = new PIXI.Point(x, y);
      this._updateSpeedText();
    });
    addButton2.position.set(400, 550);
    this.addChild(addButton2);
  }

  _addSpeedText() {
    this.speedText = new PIXI.Text(`${this.speed}`);
    this.speedText.position.set(250, 550);
    this.addChild(this.speedText);
  }

  _updateSpeedText() {
    this.speedText.text = `${parseFloat(this.speed).toPrecision(2)}`;
  }

  update() {
    if (this.ship.forwardX && this.ship.x > 550) this.ship.forwardX = false;
    if (!this.ship.forwardX && this.ship.x < 50) this.ship.forwardX = true;
    if (this.ship.forwardY && this.ship.y > 550) this.ship.forwardY = false;
    if (!this.ship.forwardY && this.ship.y < 50) this.ship.forwardY = true;

    const velocityX = this.ship.forwardX
      ? this.ship.x + this.velocity.x
      : this.ship.x - this.velocity.x;
    const velocityY = this.ship.forwardY
      ? this.ship.y + this.velocity.y
      : this.ship.y - this.velocity.y;
    this.ship.setShipPosition(velocityX, velocityY);
  }
}

export default ScalarMultiplication;
