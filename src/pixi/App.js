import * as PIXI from 'pixi.js';
import Grid from './components/Grid';
import Add from './state/Add';
import Subtract from './state/Subtract';

class App extends PIXI.Application {
  static ADD = 'ADD';
  static SUBTRACT = 'SUBTRACT';

  constructor(options) {
    super(options);
    const grid = new Grid();
    this.stage.addChild(grid);
    this.setState(App.ADD);
  }

  setState(name) {
    if (this.state) this.stage.removeChild(this.state);
    if (name === App.ADD) {
      this.state = new Add();
    }
    if (name === App.SUBTRACT) {
      this.state = new Subtract();
    }
    this.stage.addChild(this.state);
  }
}

export default App;
