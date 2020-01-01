import React, { Component } from 'react';
import { Tile } from './Tile';
import './Board.css';


export class MiniBoard extends Component {
  constructor(props) {
    super(props);
    
    const s = this.props.data.buttonSize;
    this.locations = [null,{"top":0,"left":0},{"top":0,"left":s},{"top":0,"left":2*s},{"top":s,"left":0},{"top":s,"left":s},{"top":s,"left":2*s},{"top":2*s,"left":0},{"top":2*s,"left":s},{"top":2*s,"left":2*s}];
  }
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
      return <Tile mini="true" buttonSize={this.props.data.buttonSize} tId={id} color={this.props.data.tiles[id]} key={"m"+id+"_"+this.props.data.size} loc={this.locations[id]} />
    });
    const boardSize = {
      height: this.props.data.size*this.props.data.buttonSize,
      width: this.props.data.size*this.props.data.buttonSize,
    };

    return (
      <div className="mini-square" style={boardSize}>
        {components}
      </div>
    );
  }
}
