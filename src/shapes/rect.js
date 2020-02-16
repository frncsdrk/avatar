const draw = (context) => {
  const elementWidth = context.elementWidth
  context.ctx.rect(
    context.positionX * elementWidth,
    context.positionY * elementWidth,
    elementWidth,
    elementWidth
  )
}

const drawVerticallySymmetric = (context) => {
  const elementWidth = context.elementWidth
  context.ctx.rect(
    ((context.elementsPerRow * 2 - context.positionX) - 1) * elementWidth,
    context.positionY * elementWidth,
    elementWidth,
    elementWidth
  )
}

const drawHorizontallySymmetric = (context) => {
  const elementWidth = context.elementWidth
  context.ctx.rect(
    context.positionX * elementWidth,
    ((context.elementsPerCol * 2 - context.positionY) - 1) * elementWidth,
    elementWidth,
    elementWidth
  )
}

module.exports = {
  draw,
  drawVerticallySymmetric,
  drawHorizontallySymmetric
}
