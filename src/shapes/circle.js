/**
 * Draw arc shape
 * @param {object} ctx - canvas context
 * @param {number} x
 * @param {number} y
 * @param {number} radius
 * @param {number} startingAngle
 * @param {number} endingAngle
 * @param {boolean} stroke - flag
 */
const drawRaw = (ctx, x, y, radius, startingAngle, endingAngle, stroke) => {
  ctx.beginPath()
  ctx.arc(x, y, radius, startingAngle, endingAngle)
  ctx.fill()
  stroke && ctx.stroke()
}

/**
 * Draw circle
 * @param {object} context
 */
const draw = (context) => {
  const elementWidth = context.elementWidth
  drawRaw(
    context.ctx,
    context.positionX * elementWidth + context.radius,
    context.positionY * elementWidth + context.radius,
    context.radius,
    0,
    2 * Math.PI,
    context.stroke
  )
}

/**
 * Mirror drawn circle shape vertically
 * @param {object} context
 */
const drawVerticallySymmetric = (context) => {
  const elementWidth = context.elementWidth
  const radius = context.radius
  drawRaw(
    context.ctx,
    (((context.elementsPerRow * 2 - context.positionX) - 1) * elementWidth) + radius,
    context.positionY * elementWidth + radius,
    radius,
    0,
    2 * Math.PI,
    context.stroke
  )
}

/**
 * Mirror drawn circle shape horizontally
 * @param {object} context
 */
const drawHorizontallySymmetric = (context) => {
  const elementWidth = context.elementWidth
  const radius = context.radius
  drawRaw(
    context.ctx,
    context.positionX * elementWidth + radius,
    (((context.elementsPerCol * 2 - context.positionY) - 1) * elementWidth) + radius,
    radius,
    0,
    2 * Math.PI,
    context.stroke
  )
}

module.exports = {
  draw,
  drawVerticallySymmetric,
  drawHorizontallySymmetric
}
