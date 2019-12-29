import React, { Component } from 'react';
import { MiniBoard } from './MiniBoard';
import { Board } from './Board';
import { StartButton } from './StartButton';
import './App.css';

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
      "win": "true",
      "count": 0,
      "message": `Select a puzzle size to start`,
      "size": 5,
      "loc": LOCATION_MAP['5'],
      "tiles": {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        8: "8",
        9: "9",
        12: "12",
        13: "13",
        14: "14",
        15: "15",
        16: "win"
      },
      "mini": {
        "tiles": {},
        "size": 3
      }
    }
    this.newGame = this.newGame.bind(this);
    this.handleTileMove = this.handleTileMove.bind(this);
  }

  newGame(size) {
    this.setState(resetStates(size));
  }

  handleTileMove(newTilesState) {
    const max = INNER_TILES_MAP[this.state.size].length;
    const newCount = this.state.count+1;
    for(let i=0; i<max; i++) {
      const idx = INNER_TILES_MAP[this.state.size][i];
      if (newTilesState[idx] !== this.state.mini.tiles[i+1]) {
        this.setState({"tiles": newTilesState, "count": newCount, "message": `Moves: ${newCount}`});
        return;
      }
    }

    this.setState({"win": "true", "message": `You did it in ${newCount} moves!`, "tiles": newTilesState});
  }

  render() {
    return (
      <div className="App">
        <div className="button-bar">
          <MiniBoard data={this.state.mini} />
          <div >
            <StartButton text="START" onSize={this.newGame} size="5"/>
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
  // initLocations(4);
  // initLocations(3);
  initLocations(5);
}

function initLocations(size) {
  const max = size * size;
  let arr = [];
  for (let i=1; i<=max; i++) {
    const row = Math.ceil(i/size);
    const col = i - ((row-1) * size);
    arr.push({
      top: (row-1) * 100,
      left: (col-1) * 100
    });
  }
  arr.unshift(null);
  LOCATION_MAP[String(size)] = arr;
}

function resetStates(size) {
  const max = size * size;
  let state = {
    "win": "false",
    "intro": false,
    "count": 0,
    "message": `Moves: 0`,
    "size": size,
    "loc": LOCATION_MAP[String(size)],
    "tiles": {},
    "mini": {
      "tiles": {},
      "size": size-2
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

console.log(state);
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

// function shuffleTiles(a) {
//   const max = a.length-1;
//   let current = max;
//   let count = 0;
//   const maxCount = Math.floor(Math.random() * 25) + Math.pow(4, Math.sqrt(max));
//   while (count++ < maxCount) {
//     let availSpaces = getAvailableSpaces(current, a);
//     let i = Math.floor(Math.random()*availSpaces.length);
//     let swapIdx = Number(availSpaces[i]);
//     [a[swapIdx], a[current]] = [a[current], a[swapIdx]];
//     current = swapIdx;
//   }

//   console.log(`shuffled ${maxCount} times --> `,a);
//   return a;
// }

// function getAvailableSpaces(n, arr) {
//   const size = Math.sqrt(arr.length-1);
//   const row = Math.ceil(n/size);
//   const col = n - ((row-1) * size);
//   let retArr = [];

//   const up = row > 1 ? n-size : 0;
//   if (up) {
//     retArr.push(up);
//   }
//   const down = row < size ? n+size : 0;
//   if (down) {
//     retArr.push(down);
//   }
//   const left = col > 1 ? n-1 : 0;
//   if (left) {
//     retArr.push(left);
//   }
//   const right = col < size ? n+1 : 0;
//   if (right) {
//     retArr.push(right);
//   }

//   return retArr;
// }