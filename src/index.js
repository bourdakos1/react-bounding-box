import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Canvas, { MOVE, BOX } from './Canvas'

import './styles.css'

class App extends Component {
  state = {
    image:
      'http://1.bp.blogspot.com/-9faVVE8IyPM/UF8ym3gOMbI/AAAAAAAADZY/MHfEp3X16OY/s1600/4_Cute_Cats_Wallpaper_1440x900_wallpaperhere.jpg',
    bboxes: [],
    label: 'cat',
    labels: ['cat', 'face', 'ear', 'eye', 'paw'],
    mode: BOX
  }

  colorFromLabel = label => {
    const { labels } = this.state
    const baseHue = 196
    const spread = 360 / labels.length
    const index = labels.indexOf(label)
    const hue = Math.round((index * spread + baseHue) % 360)
    return `hsl(${hue}, 100%, 50%)`
  }

  handleModeChanged = e => {
    this.setState({
      mode: e.target.value
    })
  }

  handleLabelChanged = e => {
    this.setState({
      label: e.target.value
    })
  }

  handleCoordinatesChanged = (bbox, index) => {
    this.setState(prevState => {
      const bboxes = [...prevState.bboxes]

      bboxes[index] = bbox
      return { bboxes: bboxes }
    })
  }

  handleDrawStarted = bbox => {
    this.setState(prevState => {
      bbox.label = this.state.label
      bbox.color = this.colorFromLabel(this.state.label)
      const bboxes = [bbox, ...prevState.bboxes]
      return { bboxes: bboxes }
    })
  }

  handleFileSelect = e => {
    var file = e.target.files[0]
    var reader = new FileReader()
    reader.onload = () => {}
    reader.readAsDataURL(file)
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <Canvas
          mode={this.state.mode}
          bboxes={this.state.bboxes}
          image={this.state.image}
          onDrawStarted={this.handleDrawStarted}
          onCoordinatesChanged={this.handleCoordinatesChanged}
        />
        <div>
          <div>{`Mode: ${this.state.mode}`}</div>
          <button value={MOVE} onClick={this.handleModeChanged}>
            Move
          </button>
          <button value={BOX} onClick={this.handleModeChanged}>
            Draw
          </button>
          <div>{`Label: ${this.state.label}`}</div>
          {this.state.labels.map(label => (
            <button value={label} onClick={this.handleLabelChanged}>
              {label}
            </button>
          ))}
          {this.state.bboxes
            .sort((a, b) => a.label.toLowerCase() < b.label.toLowerCase())
            .map(box => {
              const imageHeight = 700
              const imageWidth = 1120

              const cropHeight = 20
              const cropWidth = 30

              const scale = cropWidth / ((box.x2 - box.x) * imageWidth)
              const objHeight = scale * (box.y2 - box.y) * imageHeight
              const centerOffset = (cropHeight - objHeight) / 2
              const xOffset = -box.x * scale * imageWidth
              const yOffset = -box.y * scale * imageHeight
              const backgroundSize = scale * (100 / cropWidth) * imageWidth

              return (
                <div>
                  <div
                    style={{
                      backgroundImage: `url(${this.state.image})`,
                      height: `${cropHeight}px`,
                      width: `${cropWidth}px`,
                      backgroundPosition: `${xOffset}px ${yOffset +
                        centerOffset}px`,
                      backgroundSize: `${backgroundSize}%`
                    }}
                  />
                  <div>{box.label}</div>
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
