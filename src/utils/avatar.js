const { createCanvas } = require('canvas');

const shapes = {
  circle: require('../shapes/circle'),
  rect: require('../shapes/rect'),
  triangle: require('../shapes/triangle'),
};

/**
 * Parse config values
 * @param {object} conf - config
 * @returns {object} config
 */
const parseConfig = (conf) => {
  const intKeys = ['width', 'height', 'elementWidth'];
  for (let i = 0; i < intKeys.length; i++) {
    if (conf[intKeys[i]]) {
      conf[intKeys[i]] = parseInt(conf[intKeys[i]], 10);
    }
  }
  const boolKeys = ['verticallySymmetric', 'horizontallySymmetric', 'stroke'];
  for (let i = 0; i < boolKeys.length; i++) {
    if (conf[boolKeys[i]]) {
      conf[boolKeys[i]] = conf[boolKeys[i]] === 'true';
    }
  }

  return conf;
};

/**
 * Draw selected shape with context provided
 * @param {string} type - shape type
 * @param {object} context
 */
const drawShape = (type, context) => {
  const shape = shapes[type];
  shape.draw(context);
  if (context.verticallySymmetric) {
    // mirror vertically
    shape.drawVerticallySymmetric(context);
  } else if (context.horizontallySymmetric && !context.verticallySymmetric) {
    // mirror horizontally
    shape.drawHorizontallySymmetric(context);
  }
};

/**
 * Translate config to context
 * @param {object} conf - config
 * @returns {object} context
 */
const createContext = (conf) => {
  const canvas = createCanvas(conf.width || 256, conf.height || 256);
  const ctx = canvas.getContext('2d');
  const WIDTH = conf.width || 256;
  const HEIGHT = conf.height || 256;
  const elementWidth = conf.elementWidth || 16;
  const radius = elementWidth / 2;
  const verticallySymmetric = !(
    conf.horizontallySymmetric || conf.verticallySymmetric === false
  );
  const horizontallySymmetric = conf.horizontallySymmetric || false;
  // triangles
  const direction = conf.direction || 'top';
  // /traingles

  const elementsPerRow = !verticallySymmetric
    ? WIDTH / elementWidth
    : WIDTH / elementWidth / 2;
  const elementsPerCol =
    horizontallySymmetric && !verticallySymmetric
      ? HEIGHT / elementWidth / 2
      : HEIGHT / elementWidth;

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
    stroke: conf.stroke,
    bgColor: conf.bgColor,
    elementsPerRow,
    elementsPerCol,
    type: conf.type,
    body: conf.body,
  };
};

/**
 * Draw avatar specified in request body
 * @param {object} context
 */
const drawSpecified = (context) => {
  const lines = context.body.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      if (line.charAt(j) !== ' ') {
        context.positionX = j;
        context.positionY = i;
        drawShape(context.type || 'rect', context);
      }
    }
  }
};

/**
 * Draw random avatar
 * @param {object} context
 */
const drawRandom = (context) => {
  for (let i = 0; i < context.elementsPerCol; i++) {
    for (let j = 0; j < context.elementsPerRow; j++) {
      if (Math.random() > 0.5) {
        context.positionX = j;
        context.positionY = i;
        drawShape(context.type || 'rect', context);
      }
    }
  }
};

/**
 * Create an avatar
 * @param {object} conf - config
 * @param {function} cb - callback
 */
const createAvatar = (conf, cb) => {
  conf = parseConfig(conf);

  const context = createContext(conf);
  const ctx = context.ctx;
  const mimeType = conf.mimeType || 'image/png';

  if (context.bgColor) {
    ctx.beginPath();
    ctx.fillStyle = conf.bgColor;
    ctx.fillRect(0, 0, context.WIDTH, context.HEIGHT);
  }

  // NOTE: Need to change colors after bg is drawn
  ctx.fillStyle = conf.color || 'blue';
  ctx.strokeStyle = conf.strokeColor || 'black';

  if (context.body) {
    drawSpecified(context);
  } else {
    drawRandom(context);
  }

  ctx.fill();
  context.stroke && ctx.stroke();

  const buffer = context.canvas.toBuffer(mimeType);

  return cb(null, {
    contentType: mimeType,
    buffer,
  });
};

module.exports = {
  createAvatar,
};
