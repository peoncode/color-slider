import React, { Component } from 'react';
import { Tile } from './Tile';
import './Board.css';

const locations = [null,{"top":0,"left":0},{"top":0,"left":50},{"top":0,"left":100},{"top":50,"left":0},{"top":50,"left":50},{"top":50,"left":100},{"top":100,"left":0},{"top":100,"left":50},{"top":100,"left":100}];

export class MiniBoard extends Component {
  __tileFilter(key) {
    const num = parseInt(key);
    const max = this.props.data.size*this.props.data.size;
    if (num <= max && this.props.data.tiles[key]) {
      return true;
    }
    return false;
  }

  render() {
    const components = Object.keys(this.props.data.tiles).filter((key) => this.__tileFilter(key)).map((id) => {
      // console.log(`miniTile tId=${id} color=${this.props.data.tiles[id]}`);
      return <Tile mini="true" tId={id} color={this.props.data.tiles[id]} key={"m"+id+"_"+this.props.data.size} loc={locations[id]} />
    });
    const boardSize = {
      height: this.props.data.size*50,
      width: this.props.data.size*50,
    };

    return (
      <div className="mini-square" style={boardSize}>
        {components}
      </div>
    );
  }
}
