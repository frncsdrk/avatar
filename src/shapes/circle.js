const drawRaw = (ctx, x, y, radius, startingAngle, endingAngle, stroke) => {
  ctx.beginPath()
  ctx.arc(x, y, radius, startingAngle, endingAngle)
  ctx.fill()
  stroke && ctx.stroke()
}

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
