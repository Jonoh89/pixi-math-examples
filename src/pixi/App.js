import * as PIXI from 'pixi.js';
import Grid from './components/Grid';
import Add from './state/Add';
import Subtract from './state/Subtract';
import ScalarMultiplication from './state/ScalarMultiplication';
import Length from './state/Length';
import Distance from './state/Distance';
import DotProduct from './state/DotProduct';
import DotProduct2 from './state/DotProduct2';
import CircleVsCircle from './state/CircleVsCircle';

class App extends PIXI.Application {
  static ADD = 'ADD';
  static SUBTRACT = 'SUBTRACT';
  static SCALAR_MULTIPLICATION = 'SCALAR_MULTIPLICATION';
  static LENGTH = 'LENGTH';
  static DISTANCE = 'DISTANCE';
  static DOT_PRODUCT = 'DOT_PRODUCT';
  static DOT_PRODUCT_2 = 'DOT_PRODUCT_2';
  static CIRCLE_VS_CIRCLE = 'CIRCLE_VS_CIRCLE';

  constructor(options) {
    super(options);
    const grid = new Grid();
    this.stage.addChild(grid);
    this.setState(App.CIRCLE_VS_CIRCLE);
    this._setupUpdate();
  }

  setState(name) {
    if (this.state) this.stage.removeChild(this.state);
    if (name === App.ADD) {
      this.state = new Add();
    }
    if (name === App.SUBTRACT) {
      this.state = new Subtract();
    }
    if (name === App.SCALAR_MULTIPLICATION) {
      this.state = new ScalarMultiplication();
    }
    if (name === App.LENGTH) {
      this.state = new Length();
    }
    if (name === App.DISTANCE) {
      this.state = new Distance();
    }
    if (name === App.DOT_PRODUCT) {
      this.state = new DotProduct();
    }
    if (name === App.DOT_PRODUCT_2) {
      this.state = new DotProduct2();
    }
    if (name === App.CIRCLE_VS_CIRCLE) {
      this.state = new CircleVsCircle();
    }
    this.stage.addChild(this.state);
  }

  _setupUpdate() {
    PIXI.ticker.shared.add(() => {
      this.state.update();
    });
  }
}

export default App;
