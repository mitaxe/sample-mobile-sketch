import { canvas, step, canvasHeight, canvasWidth} from './constants'
import Wall from './Wall'

const wallDoc = document.getElementById('wall')
const handDoc = document.getElementById('hand')

canvas.setWidth(canvasWidth)
canvas.setHeight(canvasHeight)

const toolsPanel = {
  hand: false,
  wall: true,
  door: false
}

function resetPanel () {
  Object.keys(toolsPanel).forEach(tool => {
    toolsPanel[tool] = false
  })
}

function onWallClick () {
  resetPanel()
  toolsPanel.wall = true
}

function onHandClick () {
  resetPanel()
  Wall.clear()
  toolsPanel.hand = true
}

function onCanvasClick (e) {
  const { pointer: { x, y } } = e
  if(toolsPanel.wall) {
    Wall.draw(x, y)
  }
}

wallDoc.addEventListener('click', onWallClick)
handDoc.addEventListener('click', onHandClick)
canvas.on('mouse:down', onCanvasClick)

function drawGrid () {
  let horizontal = []
  let vertical = []
  for(let i = step; i < canvasHeight; i+=step) {
    horizontal.push(new fabric.Line([0, i, canvasWidth, i], {
      stroke: '#d3d3d3'
    }))
  }

  for(let i = step; i < canvasWidth; i = i + step) {
    vertical.push(new fabric.Line([i, canvasHeight, i, 0], {
      stroke: '#d3d3d3'
    }))
  }

  const group = new fabric.Group([...horizontal, ...vertical], {
    selectable: false
  })

  canvas.add(group)
}

drawGrid()
