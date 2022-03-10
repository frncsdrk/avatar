/**
 * Draw rectangle shape
 * @param {object} context
 */
const draw = (context) => {
  const elementWidth = context.elementWidth;
  context.ctx.rect(
    context.positionX * elementWidth,
    context.positionY * elementWidth,
    elementWidth,
    elementWidth
  );
};

/**
 * Mirror drawn rectangle shape vertically
 * @param {object} context
 */
const drawVerticallySymmetric = (context) => {
  const elementWidth = context.elementWidth;
  context.ctx.rect(
    (context.elementsPerRow * 2 - context.positionX - 1) * elementWidth,
    context.positionY * elementWidth,
    elementWidth,
    elementWidth
  );
};

/**
 * Mirror drawn rectangle shape horizontally
 * @param {object} context
 */
const drawHorizontallySymmetric = (context) => {
  const elementWidth = context.elementWidth;
  context.ctx.rect(
    context.positionX * elementWidth,
    (context.elementsPerCol * 2 - context.positionY - 1) * elementWidth,
    elementWidth,
    elementWidth
  );
};

module.exports = {
  draw,
  drawVerticallySymmetric,
  drawHorizontallySymmetric,
};
