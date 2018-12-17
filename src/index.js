import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Canvas, { MOVE, BOX } from './Canvas'

import './styles.css'

class App extends Component {
  state = {
    image:
      'http://1.bp.blogspot.com/-9faVVE8IyPM/UF8ym3gOMbI/AAAAAAAADZY/MHfEp3X16OY/s1600/4_Cute_Cats_Wallpaper_1440x900_wallpaperhere.jpg',
    bboxes: [
      { x: 0.2, y: 0.2, x2: 0.7, y2: 0.6 },
      { x: 0.1, y: 0.1, x2: 0.4, y2: 0.4 }
    ],
    mode: BOX
  }

  handleModeChanged = e => {
    this.setState({
      mode: e.target.value
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
      const bboxes = [bbox, ...prevState.bboxes]
      return { bboxes: bboxes }
    })
  }

  render() {
    return (
      <div>
        <Canvas
          mode={this.state.mode}
          bboxes={this.state.bboxes}
          image={this.state.image}
          onDrawStarted={this.handleDrawStarted}
          onCoordinatesChanged={this.handleCoordinatesChanged}
        />
        <div>{`Mode: ${this.state.mode}`}</div>
        <button value={MOVE} onClick={this.handleModeChanged}>
          Move
        </button>
        <button value={BOX} onClick={this.handleModeChanged}>
          Draw
        </button>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
