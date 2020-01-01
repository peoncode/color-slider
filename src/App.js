import React, { Component } from 'react';
import { MiniBoard } from './MiniBoard';
import { Board } from './Board';
import { StartButton } from './StartButton';
import './App.css';

let cachedState = null;
let BUTTON_SIZE = 70;
let LOCATION_MAP = {};
const COLOR_MAP = {
  "5": [
    "red", "red", "red", "red",
    "green", "green", "green", "green",
    "white", "white", "white", "white",
    "blue", "blue", "blue", "blue", 
    "yellow", "yellow", "yellow", "yellow",
    "orange", "orange", "orange", "orange"
  ]
};
const INNER_TILES_MAP = {
  "5": [7, 8, 9, 12, 13, 14, 17, 18, 19]
}

class App extends Component {
  constructor (props) {
    super(props);
    initApp();

    this.state = {
      "intro": true,
      "win": false,
      "count": 0,
      "message": `Match the pattern!`,
      "size": 5,
      "buttonSize": BUTTON_SIZE,
      "loc": LOCATION_MAP['5'],
      "tiles": {
        1: "red",
        2: "yellow",
        3: "green",
        4: "blue",
        5: "orange",
        6: "white",
        10: "yellow",
        11: "green",
        15: "blue",
        16: "orange",
        20: "red",
        21: "blue",
        22: "red",
        23: "yellow",
        24: "green",
        25: "white"
      },
      "mini": {
        "tiles": {},
        "size": 3,
        "buttonSize": BUTTON_SIZE/2
      }
    }
    this.newGame = this.newGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.handleTileMove = this.handleTileMove.bind(this);
  }

  newGame(size) {
    cachedState = resetStates(size);
    this.setState(JSON.parse(JSON.stringify(cachedState)));
  }

  resetGame() {
    this.setState(JSON.parse(JSON.stringify(cachedState)));
  }

  handleTileMove(newTilesState) {
    const max = INNER_TILES_MAP[this.state.size].length;
    const newCount = this.state.count+1;
    for (let i=0; i<max; i++) {
      const idx = INNER_TILES_MAP[this.state.size][i];
      if (newTilesState[idx] !== this.state.mini.tiles[i+1]) {
        this.setState({"tiles": newTilesState, "count": newCount, "message": `Moves: ${newCount}`});
        return;
      }
    }

    this.setState({"win": true, "message": `You did it in ${newCount} moves!`, "tiles": newTilesState});
  }

  render() {
    let miniBoard = "";
    let resetButton = "";
    if (!this.state.intro) {
      miniBoard = <MiniBoard data={this.state.mini} />;
      resetButton = <StartButton text="RESET" onSize={this.resetGame}/>;
    }
    return (
      <div className="App">
        <div className="button-bar">
          {miniBoard}
          <div>
            <StartButton text="START" onSize={this.newGame} size="5"/>
            {resetButton}
          </div>
        </div>
        <Board onMoveTile={this.handleTileMove} data={this.state}/>
        <h2 className="counter">{this.state.message}</h2>
        <div className="credit">Kevin Dang (Dec 2019)</div>
      </div>
    );
  }
}
export default App;

function initApp() {
  initLocations(5);
}

function initLocations(size) {
  const max = size * size;
  let arr = [];
  for (let i=1; i<=max; i++) {
    const row = Math.ceil(i/size);
    const col = i - ((row-1) * size);
    arr.push({
      top: (row-1) * BUTTON_SIZE,
      left: (col-1) * BUTTON_SIZE
    });
  }
  arr.unshift(null);
  LOCATION_MAP[String(size)] = arr;
}

function resetStates(size) {
  const max = size * size;
  let state = {
    "win": false,
    "intro": false,
    "count": 0,
    "message": `Moves: 0`,
    "size": size,
    "buttonSize": BUTTON_SIZE,
    "loc": LOCATION_MAP[String(size)],
    "tiles": {},
    "mini": {
      "tiles": {},
      "size": size-2,
      "buttonSize": BUTTON_SIZE/2
    }
  };
  const arr = randomizeTiles(size);
  const miniTiles = randomizeTiles(size, true);
  
  for (let i=1; i<=max; i++) {
    state.tiles[i] = arr[i-1];
    if (i <= INNER_TILES_MAP['5'].length) {
      state.mini.tiles[i] = miniTiles[i];
    }
  }

  return state;
}

function randomizeTiles(size, noRandonBlank) {
  let a = COLOR_MAP[size].slice();
  let randomizedList = [null];
  for (let i=0; i<a.length; i++) {
    const randomIndex = Math.floor(Math.random() * (a.length-i));
    randomizedList.push(a[randomIndex]);
    a[randomIndex] = a[a.length-i-1];
  }

  if (!noRandonBlank) {
    let randomBlank = Math.floor(Math.random() * (INNER_TILES_MAP[size].length));
    randomBlank = INNER_TILES_MAP[size][randomBlank]-1;
    [randomizedList[randomBlank], randomizedList[0]] = [randomizedList[0], randomizedList[randomBlank]];
  }

  return randomizedList;
}
