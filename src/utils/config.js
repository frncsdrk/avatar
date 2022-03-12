const { createCanvas } = require('canvas')

/**
 * Parse config values
 * @param {object} conf - config
 * @returns {object} config
 */
const parseConfig = (conf) => {
  // Ensure the values of the following keys are numbers
  const intKeys = ['width', 'height', 'elementWidth']
  for (let i = 0; i < intKeys.length; i++) {
    if (conf[intKeys[i]]) {
      conf[intKeys[i]] = parseInt(conf[intKeys[i]], 10)
    }
  }

  // Ensure the values of the following keys are bools
  const boolKeys = ['verticallySymmetric', 'horizontallySymmetric', 'stroke']
  for (let i = 0; i < boolKeys.length; i++) {
    if (conf[boolKeys[i]]) {
      conf[boolKeys[i]] = (conf[boolKeys[i]] === 'true')
    }
  }

  return conf
}

/**
 * Translate config to context
 * @param {object} conf - config
 * @returns {object} context
 */
const createContext = (conf) => {
  const canvas = createCanvas(conf.width || 256, conf.height || 256)
  const ctx = canvas.getContext('2d')
  const WIDTH = conf.width || 256
  const HEIGHT = conf.height || 256
  const elementWidth = conf.elementWidth || 16
  const radius = elementWidth / 2
  const verticallySymmetric = !(conf.horizontallySymmetric || conf.verticallySymmetric === false)
  const horizontallySymmetric = conf.horizontallySymmetric || false
  // triangles
  const direction = conf.direction || 'top'
  // /triangles
  // initials
  const letters = conf.letters || 'AA'
  const rotation = conf.rotation || 0
  const fontFamily = conf.fontFamily || 'Helvetica'
  const fontSize = conf.fontSize || '100'
  const widthFactor = conf.widthFactor || 1.3
  const heightFactor = conf.heighFactor || 0.8
  // /initials

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
    direction,
    letters,
    rotation,
    fontFamily,
    fontSize,
    widthFactor,
    heightFactor,
    stroke: conf.stroke,
    bgColor: conf.bgColor,
    elementsPerRow,
    elementsPerCol,
    type: conf.type,
    body: conf.body
  }
}

module.exports = {
  parseConfig,
  createContext
}
