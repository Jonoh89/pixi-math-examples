import React, { Component } from 'react';
import * as PIXI from 'pixi.js';
import PIXIApp from './pixi/App';
import './App.css';
import ShipUrl from './images/ship.png';

const examples = [
  { name: 'Add', state: PIXIApp.ADD },
  { name: 'Subtract', state: PIXIApp.SUBTRACT },
  { name: 'Scalar Multiplication', state: PIXIApp.SCALAR_MULTIPLICATION },
  { name: 'Length', state: PIXIApp.LENGTH },
  { name: 'Distance', state: PIXIApp.DISTANCE },
  { name: 'Dot Product', state: PIXIApp.DOT_PRODUCT },
  { name: 'Dot Product (2)', state: PIXIApp.DOT_PRODUCT_2 },
  { name: 'Circle vs Circle', state: PIXIApp.CIRCLE_VS_CIRCLE }
];

class App extends Component {
  constructor() {
    super();
    this._goToState = this._goToState.bind(this);
  }

  componentDidMount() {
    PIXI.loader.add([{ name: 'ship', url: ShipUrl }]).load(() => {
      this.pixiApp = new PIXIApp({
        height: 600,
        width: 600,
        view: this.c,
        backgroundColor: 0xffffff
      });
    });
  }

  _goToState(state) {
    if (this.pixiApp) {
      this.pixiApp.setState(state);
    }
  }

  render() {
    return (
      <div className="App">
        <section className="App-menu">
          {examples.map(({ name, state }) => (
            <button key={name} onClick={() => this._goToState(state)}>
              {name}
            </button>
          ))}
        </section>
        <section className="App-example">
          <canvas ref={c => (this.c = c)} />
        </section>
      </div>
    );
  }
}

export default App;
