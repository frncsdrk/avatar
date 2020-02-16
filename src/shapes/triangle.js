// TODO: Triangles facing in other directions

const drawRawTop = (ctx, x, y, width, height, stroke) => {
  ctx.beginPath()
  ctx.moveTo(x + (width / 2), y)
  ctx.lineTo(x + width, y + height)
  ctx.lineTo(x, y + height)
  ctx.closePath()
  ctx.fill()
  stroke && ctx.stroke()
}

const draw = (context) => {
  const elementWidth = context.elementWidth
  drawRawTop(
    context.ctx,
    context.positionX * elementWidth,
    context.positionY * elementWidth,
    elementWidth,
    elementWidth,
    context.stroke
  )
}

const drawVerticallySymmetric = (context) => {
  const elementWidth = context.elementWidth
  drawRawTop(
    context.ctx,
    ((context.elementsPerRow * 2 - context.positionX) - 1) * elementWidth,
    context.positionY * elementWidth,
    elementWidth,
    elementWidth,
    context.stroke
  )
}

const drawHorizontallySymmetric = (context) => {
  const elementWidth = context.elementWidth
  drawRawTop(
    context.ctx,
    context.positionX * elementWidth,
    ((context.elementsPerCol * 2 - context.positionY) - 1) * elementWidth,
    elementWidth,
    elementWidth,
    context.stroke
  )
}

module.exports = {
  draw,
  drawVerticallySymmetric,
  drawHorizontallySymmetric
}
