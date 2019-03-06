import { canvas, commonControls } from './constants'
import { findNearestDot } from './helpers'

function Dot(x, y) {
  return {
    x, y
  }
}

class Wall {
  constructor () {
    this.wall = [];
    this.circles = []
  }

  draw (x, y) {
    const xDot = findNearestDot(x)
    const yDot = findNearestDot(y)
    const circleRadius  = 4
    const circle = new fabric.Circle({
      left: xDot - circleRadius,
      top: yDot - circleRadius,
      radius: circleRadius,
      strokeWidth: 2,
      fill: '#ffc220'
    })

    this.circles.push(circle)
    canvas.add(circle)

    this.wall.push(new Dot(xDot, yDot));
    if (this.wall.length === 2) {
      this.build()
    }
  }

  build () {
    const line = new fabric.Line([this.wall[0].x, this.wall[0].y, this.wall[1].x, this.wall[1].y], {
      stroke: '#262626'
    })
    line.setControlsVisibility(commonControls)
    canvas.add(line)

    setTimeout(() => this.circles.forEach(circle => canvas.remove(circle)), 500)

    this.wall = []
  }

  clear () {
    this.wall = [];
    this.circles.forEach(circle => canvas.remove(circle))
    this.circles = []
  }
}

const wall = new Wall()
export default wall

