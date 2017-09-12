import React, { Component } from 'react';
import * as PIXI from 'pixi.js';
import PIXIApp from './pixi/App';
import './App.css';
import ShipUrl from './images/ship.png';

class App extends Component {
  componentDidMount() {
    PIXI.loader.add([{ name: 'ship', url: ShipUrl }]).load(() => {
      new PIXIApp({
        height: 600,
        width: 600,
        view: this.c,
        backgroundColor: 0xffffff
      });
    });
  }

  render() {
    return (
      <div className="App">
        <section className="App-menu">
          <a>Addition</a>
        </section>
        <section className="App-example">
          <canvas ref={c => (this.c = c)} />
        </section>
      </div>
    );
  }
}

export default App;
