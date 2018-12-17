import React, { Component } from 'react'

import { BOX } from './Canvas'

import styles from './Box.module.css'

export default class Rect extends Component {
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

    document.documentElement.style.setProperty('--color', this.props.color)

    return (
      <div className={styles.wrapper} style={dimensions}>
        <div
          className={this.props.mode === BOX ? styles.draw : styles.move}
        />
      </div>
    )
  }
}
