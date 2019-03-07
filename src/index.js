import { canvas, step, canvasHeight, canvasWidth} from './constants'
import Wall from './Wall'

const wallDoc = document.getElementById('wall')
const handDoc = document.getElementById('hand')
const undoDoc = document.getElementById('undo')
const redoDoc = document.getElementById('redo')

canvas.setWidth(canvasWidth)
canvas.setHeight(canvasHeight)

let isRedoing = false
let history = []
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
canvas.on('object:added', function(){
  if(!isRedoing){
    history = []
  }
  isRedoing = false;
})
undoDoc.addEventListener('click', () => {
  Wall.clear()
  if(canvas._objects.length > 1){
    history.push(canvas._objects.pop());
    canvas.renderAll()
  }
})
redoDoc.addEventListener('click', () => {
  Wall.clear()
  if(history.length > 0){
    isRedoing = true;
    canvas.add(history.pop())
  }
})

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
