const RADIAN_RATIO = Math.PI / 180
const WIDTH = 320
const HEIGHT = 256
const GRID_WIDTH = 16

var noop = () => {}

var el = document.createElement('canvas')
var ctx = el.getContext('2d')
var buttons = document.createElement('p')
var code = document.createElement('pre')
var arrows = new Image()

arrows.src = 'arrows.png'
arrows.onload = function () {
  redraw(noop)
}

var tile = new Image()
arrows.onload = function () {
  redraw(noop)
}

tile.src = 'tile.png'

el.width = WIDTH
el.height = HEIGHT
el.style.border = '1px solid black'

document.body.appendChild(el)

createButton('resetTransform', resetTransform)
createButton('center', center)
createButton('clear', clear)
br()
createButton('flipX', flipX)
createButton('flipY', flipY)
br()
createButton('rotate45', rotate45)
createButton('rotate90', rotate90)
createButton('rotate180', rotate180)
br()
createButton('translateTop', translateTop)
createButton('translateRight', translateRight)
createButton('translateBottom', translateBottom)
createButton('translateLeft', translateLeft)
br()
createButton('drawTile', drawTile)

document.body.appendChild(buttons)
document.body.appendChild(code)

function br () {
  var el = document.createElement('br')
  buttons.appendChild(el)
}

function redraw (handler) {
  temporaryClear()
  handler()
  drawAxis()
  drawMiddle()
  drawGrid()
  rect()
}

function drawMiddle () {
  ctx.save()
  resetTransform()
  ctx.beginPath()
  ctx.moveTo(WIDTH/2, HEIGHT/2-10)
  ctx.lineTo(WIDTH/2, HEIGHT/2+10)
  ctx.moveTo(WIDTH/2-10, HEIGHT/2)
  ctx.lineTo(WIDTH/2+10, HEIGHT/2)
  ctx.stroke()
  ctx.restore()
}

function clear () {
  ctx.clearRect(0, 0, WIDTH, HEIGHT)
}

function temporaryClear () {
  ctx.save()
  resetTransform()
  ctx.globalAlpha = 0.75
  ctx.fillStyle = '#fff'
  ctx.fillRect(0,0,WIDTH,HEIGHT)
  ctx.globalAlpha = 1
  ctx.restore()
}

function createButton (label, handler) {
  var btn = document.createElement('button')

  btn.innerText = label
  btn.addEventListener('click', e => {
    code.innerText = handler
    redraw(handler)
  })

  buttons.appendChild(btn)
}

function flipX () {
  ctx.scale(-1, 1)
}

function flipY () {
  ctx.scale(1, -1)
}

function center () {
  resetTransform()
  ctx.translate(WIDTH/2, HEIGHT/2)
}

function translateTop () {
  ctx.translate(0, -GRID_WIDTH)
}
function translateBottom () {
  ctx.translate(0, GRID_WIDTH)
}
function translateLeft () {
  ctx.translate(-GRID_WIDTH, 0)
}

function translateRight () {
  ctx.translate(GRID_WIDTH, 0)
}

function rotate45 () {
  ctx.rotate(toRadian(45))
}
function rotate90 () {
  ctx.rotate(toRadian(90))
}
function rotate180 () {
  ctx.rotate(toRadian(180))
}

function rect () {
  ctx.globalAlpha = 0.1
  ctx.fillStyle = '#888'
  ctx.fillRect(0, 0, WIDTH, HEIGHT)
  ctx.globalAlpha = 1
}

function toRadian (deg) {
  return deg * RADIAN_RATIO
}

function resetTransform () {
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}

function border () {
  ctx.strokeStyle = 'black'
  ctx.strokeRect(0, 0, WIDTH, HEIGHT)
}

function drawAxis () {
  ctx.save()
  ctx.translate(-15, -15)
  ctx.drawImage(arrows, 0, 0)
  ctx.restore()
}

function drawTile () {
  ctx.drawImage(tile, 0, 0)
}

function drawGrid () {
  ctx.save()
  resetTransform()
  ctx.strokeStyle = '#ddd'
  ctx.beginPath()

  for (let y = 0; y < HEIGHT; y += GRID_WIDTH) {
    ctx.moveTo(0, y)
    ctx.lineTo(WIDTH, y)
  }

  for (let x = 0; x < WIDTH; x += GRID_WIDTH) {
    ctx.moveTo(x, 0)
    ctx.lineTo(x, HEIGHT)
  }

  ctx.stroke()
  ctx.restore()
}
