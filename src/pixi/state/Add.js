import * as PIXI from 'pixi.js';
import Ship from '../components/Ship';
import Button from '../components/Button';
import { add } from '../../VectorMath';

class Add extends PIXI.Container {
  constructor() {
    super();
    this._addShip();
    this._addButton();
  }

  _addShip() {
    this.ship = new Ship();
    this.ship.setShipPosition(200, 200);
    this.addChild(this.ship);
  }

  _addButton() {
    const addButton1 = new Button({ text: 'Add [50, 50]' });
    addButton1.on('pointerdown', () => {
      const [x, y] = add(this.ship.position, new PIXI.Point(50, 50));
      this.ship.setShipPosition(x, y);
    });
    addButton1.position.set(0, 550);
    this.addChild(addButton1);

    const addButton2 = new Button({ text: 'Add [-50, -50]' });
    addButton2.on('pointerdown', () => {
      const [x, y] = add(this.ship.position, new PIXI.Point(-50, -50));
      this.ship.setShipPosition(x, y);
    });
    addButton2.position.set(150, 550);
    this.addChild(addButton2);

    const addButton3 = new Button({ text: 'Add [100, -100]' });
    addButton3.on('pointerdown', () => {
      const [x, y] = add(this.ship.position, new PIXI.Point(100, -100));
      this.ship.setShipPosition(x, y);
    });
    addButton3.position.set(300, 550);
    this.addChild(addButton3);

    const addButton4 = new Button({ text: 'Add [-100, 100]' });
    addButton4.on('pointerdown', () => {
      const [x, y] = add(this.ship.position, new PIXI.Point(-100, 100));
      this.ship.setShipPosition(x, y);
    });
    addButton4.position.set(450, 550);
    this.addChild(addButton4);
  }
}

export default Add;
