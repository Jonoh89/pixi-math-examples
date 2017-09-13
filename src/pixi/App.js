import * as PIXI from 'pixi.js';
import Grid from './components/Grid';
import Add from './state/Add';
import Subtract from './state/Subtract';
import ScalarMultiplication from './state/ScalarMultiplication';

class App extends PIXI.Application {
  static ADD = 'ADD';
  static SUBTRACT = 'SUBTRACT';
  static SCALAR_MULTIPLICATION = 'SCALAR_MULTIPLICATION';

  constructor(options) {
    super(options);
    const grid = new Grid();
    this.stage.addChild(grid);
    this.setState(App.ADD);
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
    this.stage.addChild(this.state);
  }

  _setupUpdate() {
    PIXI.ticker.shared.add(() => {
      this.state.update();
    });
  }
}

export default App;
