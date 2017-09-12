import * as PIXI from 'pixi.js';
import Grid from './components/Grid';
import Add from './state/Add';

class App extends PIXI.Application {
  constructor(options) {
    super(options);
    const grid = new Grid();
    this.stage.addChild(grid);
    this.setState('add');
  }

  setState(name) {
    if (this.state) this.stage.removeChild(this.state);
    if (name === 'add') {
      this.state = new Add();
    }
    this.stage.addChild(this.state);
  }
}

export default App;
