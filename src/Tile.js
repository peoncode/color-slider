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
    let location = JSON.parse(JSON.stringify(this.props.loc));
    location.width = this.props.buttonSize + "px";
    location.height = this.props.buttonSize + "px";
    if (this.props.mini === "true") {
      className.push("mini-tile");
      disabled = "disabled";
    } else {
      className.push("tile");
    }

    this.props.overlay && className.push("overlay");
    this.props.hide && className.push("hidden");
    
    return (
      <button className={className.join(' ')} style={location} tid={this.props.tId} onClick={this.handleClick} disabled={disabled}></button>
    );
  }
}