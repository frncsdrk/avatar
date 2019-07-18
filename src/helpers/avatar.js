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

const createAvatar = (conf, cb) => {
  conf = parseConfig(conf)

  const canvas = createCanvas(conf.width || 256, conf.height || 256)
  const ctx = canvas.getContext('2d')
  const WIDTH = conf.width || 256
  const HEIGHT = conf.height || 256
  const elementWidth = conf.elementWidth || 16
  const verticallySymmetric = !conf.horizontallySymmetric ? conf.verticallySymmetric || true : false
  const horizontallySymmetric = conf.horizontallySymmetric || false

  if (conf.bgColor) {
    ctx.beginPath()
    ctx.fillStyle = conf.bgColor
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
  }

  ctx.fillStyle = conf.color || 'blue'
  ctx.strokeStyle = conf.strokeColor || 'black'
  const elementsPerRow = !verticallySymmetric ? WIDTH / elementWidth : WIDTH / elementWidth / 2
  const elementsPerCol = horizontallySymmetric && !verticallySymmetric ? HEIGHT / elementWidth / 2 : HEIGHT / elementWidth

  for (let i = 0; i < elementsPerCol; i++) {
    for (let j = 0; j < elementsPerRow; j++) {
      if (Math.random() > 0.5) {
        if (conf.type === 'circle') {
          const radius = elementWidth / 2
          ctx.beginPath()
          ctx.arc(j * elementWidth + radius, i * elementWidth + radius, radius, 0, 2 * Math.PI)
          ctx.fill()
          conf.stroke && ctx.stroke()
          if (verticallySymmetric) {
            // mirror vertically
            ctx.beginPath()
            ctx.arc((((elementsPerRow * 2 - j) - 1) * elementWidth) + radius, i * elementWidth + radius, radius, 0, 2 * Math.PI)
            ctx.fill()
            conf.stroke && ctx.stroke()
          } else if (horizontallySymmetric && !verticallySymmetric) {
            // mirror horizontally
            ctx.beginPath()
            ctx.arc(j * elementWidth + radius, (((elementsPerCol * 2 - i) - 1) * elementWidth) + radius, radius, 0, 2 * Math.PI)
            ctx.fill()
            conf.stroke && ctx.stroke()
          }
        } else {
          ctx.rect(j * elementWidth, i * elementWidth, elementWidth, elementWidth)
          if (verticallySymmetric) {
            // mirror vertically
            ctx.rect(((elementsPerRow * 2 - j) - 1) * elementWidth, i * elementWidth, elementWidth, elementWidth)
          } else if (horizontallySymmetric && !verticallySymmetric) {
            // mirror horizontally
            ctx.rect(j * elementWidth, ((elementsPerCol * 2 - i) - 1) * elementWidth, elementWidth, elementWidth)
          }
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
