import React, { Component } from 'react';
import './Board.css';

export class Splash extends Component {
  render() {
    const dimensions = this.props.buttonSize * 2.5;
    const placement = (this.props.buttonSize * 5 - dimensions) / 2;
    const size = {
      width: dimensions,
      height: dimensions,
      top: placement,
      left: placement
    }
    return (
      <div className="intro" style={size}>
        <div>{this.props.title}</div>
        <div className="intro2">A <a href="http://reactjs.org" className="react" target="_blank" rel="noreferrer noopener">ReactJs</a> App</div>
      </div>
    );
  }
}