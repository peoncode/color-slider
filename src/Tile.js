import React, { Component } from 'react';
import './Tile.css';

export class Tile extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.moveTile(e.target);
  }

  render() {
    let disabled = "";
    let className = [this.props.color];
    let location = this.props.loc;
    if (this.props.mini === "true") {
      className.push("MiniTile");
      disabled = "disabled";
    } else {
      className.push("Tile");
    }

    this.props.overlay && className.push("overlay");
    this.props.hide && className.push("hidden");
    
    return (
      <button className={className.join(' ')} style={location} tid={this.props.tId} onClick={this.handleClick} disabled={disabled}></button>
    );
  }
}