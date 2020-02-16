const { createCanvas } = require('canvas')

const shapes = {
  circle: require('../shapes/circle'),
  rect: require('../shapes/rect'),
  triangle: require('../shapes/triangle')
}

const parseConfig = (conf) => {
  const intKeys = ['width', 'height', 'elementWidth']
  for (let i = 0; i < intKeys.length; i++) {
    conf[intKeys[i]] = parseInt(conf[intKeys[i]])
  }
  const boolKeys = ['verticallySymmetric', 'horizontallySymmetric', 'stroke']
  for (let i = 0; i < boolKeys.length; i++) {
    conf[boolKeys[i]] = (conf[boolKeys[i]] === 'true')
  }

  return conf
}

const drawShape = (type, context) => {
  const shape = shapes[type]
  shape.draw(context)
  if (context.verticallySymmetric) {
    // mirror vertically
    shape.drawVerticallySymmetric(context)
  } else if (context.horizontallySymmetric && !context.verticallySymmetric) {
    // mirror horizontally
    shape.drawHorizontallySymmetric(context)
  }
}

const createContext = (conf) => {
  const canvas = createCanvas(conf.width || 256, conf.height || 256)
  const ctx = canvas.getContext('2d')
  const WIDTH = conf.width || 256
  const HEIGHT = conf.height || 256
  const elementWidth = conf.elementWidth || 16
  const radius = elementWidth / 2
  const verticallySymmetric = !conf.horizontallySymmetric ? conf.verticallySymmetric || true : false
  const horizontallySymmetric = conf.horizontallySymmetric || false

  const elementsPerRow = !verticallySymmetric ? WIDTH / elementWidth : WIDTH / elementWidth / 2
  const elementsPerCol = horizontallySymmetric && !verticallySymmetric ? HEIGHT / elementWidth / 2 : HEIGHT / elementWidth

  return {
    canvas,
    ctx,
    WIDTH,
    HEIGHT,
    elementWidth,
    radius,
    verticallySymmetric,
    horizontallySymmetric,
    stroke: conf.stroke,
    bgColor: conf.bgColor,
    elementsPerRow,
    elementsPerCol
  }
}

const createAvatar = (conf, cb) => {
  conf = parseConfig(conf)

  const context = createContext(conf)
  const ctx = context.ctx

  if (context.bgColor) {
    ctx.beginPath()
    ctx.fillStyle = conf.bgColor
    ctx.fillRect(0, 0, context.WIDTH, context.HEIGHT)
  }

  // NOTE: Need to change colors after bg is drawn
  ctx.fillStyle = conf.color || 'blue'
  ctx.strokeStyle = conf.strokeColor || 'black'

  for (let i = 0; i < context.elementsPerCol; i++) {
    for (let j = 0; j < context.elementsPerRow; j++) {
      if (Math.random() > 0.5) {
        context.positionX = j
        context.positionY = i
        drawShape(conf.type || 'rect', context)
      }
    }
  }

  ctx.fill()
  context.stroke && ctx.stroke()

  const buffer = context.canvas.toBuffer()

  cb(null, buffer)
}

module.exports = {
  createAvatar
}
