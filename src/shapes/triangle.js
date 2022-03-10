/**
 * Draw top facing triangle
 * @param {object} ctx - canvas context
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {boolean} stroke - flag
 */
const drawRawTop = (ctx, x, y, width, height, stroke) => {
  ctx.beginPath();
  ctx.moveTo(x + width / 2, y);
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x, y + height);
  ctx.closePath();
  ctx.fill();
  stroke && ctx.stroke();
};

/**
 * Draw bottom facing triangle
 * @param {object} ctx - canvas context
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {boolean} stroke - flag
 */
const drawRawBottom = (ctx, x, y, width, height, stroke) => {
  ctx.beginPath();
  ctx.moveTo(x + width / 2, y + height);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.fill();
  stroke && ctx.stroke();
};

/**
 * Draw left facing triangle
 * @param {object} ctx - canvas context
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {boolean} stroke - flag
 */
const drawRawLeft = (ctx, x, y, width, height, stroke) => {
  ctx.beginPath();
  ctx.moveTo(x, y + height / 2);
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x + width, y);
  ctx.closePath();
  ctx.fill();
  stroke && ctx.stroke();
};

/**
 * Draw right facing triangle
 * @param {object} ctx - canvas context
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {boolean} stroke - flag
 */
const drawRawRight = (ctx, x, y, width, height, stroke) => {
  ctx.beginPath();
  ctx.moveTo(x + width, y + height / 2);
  ctx.lineTo(x, y + height);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.fill();
  stroke && ctx.stroke();
};

/**
 * Draw triangle facing specified direction
 * @param {object} context
 */
const draw = (context) => {
  const elementWidth = context.elementWidth;
  let drawMethod = () => {};
  switch (context.direction) {
    case 'top':
      drawMethod = drawRawTop;
      break;
    case 'bottom':
      drawMethod = drawRawBottom;
      break;
    case 'left':
      drawMethod = drawRawLeft;
      break;
    case 'right':
      drawMethod = drawRawRight;
      break;
  }

  drawMethod(
    context.ctx,
    context.positionX * elementWidth,
    context.positionY * elementWidth,
    elementWidth,
    elementWidth,
    context.stroke
  );
};

/**
 * Mirror triangle facing specified direction vertically
 * @param {object} context
 */
const drawVerticallySymmetric = (context) => {
  const elementWidth = context.elementWidth;
  let drawMethod = () => {};
  switch (context.direction) {
    case 'top':
      drawMethod = drawRawTop;
      break;
    case 'bottom':
      drawMethod = drawRawBottom;
      break;
    case 'left':
      drawMethod = drawRawLeft;
      break;
    case 'right':
      drawMethod = drawRawRight;
      break;
  }

  drawMethod(
    context.ctx,
    (context.elementsPerRow * 2 - context.positionX - 1) * elementWidth,
    context.positionY * elementWidth,
    elementWidth,
    elementWidth,
    context.stroke
  );
};

/**
 * Mirror facing triangle facing specified direction horizontally
 * @param {object} context
 */
const drawHorizontallySymmetric = (context) => {
  const elementWidth = context.elementWidth;
  let drawMethod = () => {};
  switch (context.direction) {
    case 'top':
      drawMethod = drawRawTop;
      break;
    case 'bottom':
      drawMethod = drawRawBottom;
      break;
    case 'left':
      drawMethod = drawRawLeft;
      break;
    case 'right':
      drawMethod = drawRawRight;
      break;
  }

  drawMethod(
    context.ctx,
    context.positionX * elementWidth,
    (context.elementsPerCol * 2 - context.positionY - 1) * elementWidth,
    elementWidth,
    elementWidth,
    context.stroke
  );
};

module.exports = {
  draw,
  drawVerticallySymmetric,
  drawHorizontallySymmetric,
};
