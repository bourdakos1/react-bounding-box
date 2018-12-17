import React, { Component } from 'react'

export default class Rect extends Component {
  handleMouseDown = e => {
    this.props.onCornerGrabbed(e, this.props.index)
  }

  render() {
    const { bbox, imageSize } = this.props
    const { x, y, x2, y2 } = bbox
    const { imageWidth, imageHeight } = imageSize

    const dimensions = {
      left: x > x2 ? Math.round(x2 * imageWidth) : Math.round(x * imageWidth),
      top: y > y2 ? Math.round(y2 * imageHeight) : Math.round(y * imageHeight),
      width: Math.abs(Math.round((x2 - x) * imageWidth)),
      height: Math.abs(Math.round((y2 - y) * imageHeight))
    }

    return (
      <div className="Rect" style={dimensions}>
        <div
          id="00"
          onMouseDown={this.handleMouseDown}
          className="back-nob-base back-nob"
        />
        <div
          id="10"
          onMouseDown={this.handleMouseDown}
          className="back-nob-base back-nob2"
        />
        <div
          id="11"
          onMouseDown={this.handleMouseDown}
          className="back-nob-base back-nob3"
        />
        <div
          id="01"
          onMouseDown={this.handleMouseDown}
          className="back-nob-base back-nob4"
        />
      </div>
    )
  }
}
