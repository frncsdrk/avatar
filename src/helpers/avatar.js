const { createCanvas } = require('canvas')

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

const drawShape = (conf, options) => {
  conf.drawCb()
  if (options.verticallySymmetric) {
    // mirror vertically
    conf.drawVerticallySymmetricCb()
  } else if (options.horizontallySymmetric && !options.verticallySymmetric) {
    // mirror horizontally
    conf.drawHorizontallySymmetricCb()
  }
}

const drawArc = (ctx, x, y, radius, startingAngle, endingAngle, stroke) => {
  ctx.beginPath()
  ctx.arc(x, y, radius, startingAngle, endingAngle)
  ctx.fill()
  stroke && ctx.stroke()
}

const drawTriangleTop = (ctx, x, y, width, height, stroke) => {
  ctx.beginPath()
  ctx.moveTo(x + (width / 2), y)
  ctx.lineTo(x + width, y + height)
  ctx.lineTo(x, y + height)
  ctx.closePath()
  ctx.fill()
  stroke && ctx.stroke()
}

const createAvatar = (conf, cb) => {
  conf = parseConfig(conf)

  const canvas = createCanvas(conf.width || 256, conf.height || 256)
  const ctx = canvas.getContext('2d')
  const WIDTH = conf.width || 256
  const HEIGHT = conf.height || 256
  const elementWidth = conf.elementWidth || 16
  const verticallySymmetric = !conf.horizontallySymmetric ? conf.verticallySymmetric || true : false
  const horizontallySymmetric = conf.horizontallySymmetric || false

  ctx.fillStyle = conf.color || 'blue'
  ctx.strokeStyle = conf.strokeColor || 'black'

  const elementsPerRow = !verticallySymmetric ? WIDTH / elementWidth : WIDTH / elementWidth / 2
  const elementsPerCol = horizontallySymmetric && !verticallySymmetric ? HEIGHT / elementWidth / 2 : HEIGHT / elementWidth

  if (conf.bgColor) {
    ctx.beginPath()
    ctx.fillStyle = conf.bgColor
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
  }

  for (let i = 0; i < elementsPerCol; i++) {
    for (let j = 0; j < elementsPerRow; j++) {
      if (Math.random() > 0.5) {
        if (conf.type === 'circle') {
          const radius = elementWidth / 2
          drawShape(
            {
              drawCb: () => {
                drawArc(ctx, j * elementWidth + radius, i * elementWidth + radius, radius, 0, 2 * Math.PI, conf.stroke)
              },
              drawVerticallySymmetricCb: () => {
                drawArc(ctx, (((elementsPerRow * 2 - j) - 1) * elementWidth) + radius, i * elementWidth + radius, radius, 0, 2 * Math.PI, conf.stroke)
              },
              drawHorizontallySymmetricCb: () => {
                drawArc(ctx, j * elementWidth + radius, (((elementsPerCol * 2 - i) - 1) * elementWidth) + radius, radius, 0, 2 * Math.PI, conf.stroke)
              }
            },
            {
              verticallySymmetric,
              horizontallySymmetric
            }
          )
        } else if (conf.type === 'triangle') {
          // TODO: Triangles facing in other directions
          drawShape(
            {
              drawCb: () => {
                drawTriangleTop(ctx, j * elementWidth, i * elementWidth, elementWidth, elementWidth, conf.stroke)
              },
              drawVerticallySymmetricCb: () => {
                drawTriangleTop(ctx, ((elementsPerRow * 2 - j) - 1) * elementWidth, i * elementWidth, elementWidth, elementWidth, conf.stroke)
              },
              drawHorizontallySymmetricCb: () => {
                drawTriangleTop(ctx, j * elementWidth, ((elementsPerCol * 2 - i) - 1) * elementWidth, elementWidth, elementWidth, conf.stroke)
              }
            },
            {
              verticallySymmetric,
              horizontallySymmetric
            }
          )
        } else {
          drawShape(
            {
              drawCb: () => {
                ctx.rect(j * elementWidth, i * elementWidth, elementWidth, elementWidth)
              },
              drawVerticallySymmetricCb: () => {
                ctx.rect(((elementsPerRow * 2 - j) - 1) * elementWidth, i * elementWidth, elementWidth, elementWidth)
              },
              drawHorizontallySymmetricCb: () => {
                ctx.rect(j * elementWidth, ((elementsPerCol * 2 - i) - 1) * elementWidth, elementWidth, elementWidth)
              }
            },
            {
              verticallySymmetric,
              horizontallySymmetric
            }
          )
        }
      }
    }
  }

  ctx.fill()
  conf.stroke && ctx.stroke()

  const buffer = canvas.toBuffer()

  cb(null, buffer)
}

module.exports = {
  createAvatar
}
