const { parseConfig, createContext } = require('./config');

/**
 * Draw selected shape with context provided
 * @param {object} context
 */
const draw = (context) => {
  const ctx = context.ctx;
  ctx.font = context.fontSize + 'px' + ' ' + context.fontFamily; // default: '30px Helvetica'
  // ctx.rotate(0.1)
  console.log('width, fontSize:', context.WIDTH, context.fontSize);
  ctx.fillText(
    context.letters,
    context.WIDTH / 2 - context.fontSize * 1.3 / 2,
    context.HEIGHT / 2 + context.fontSize * 0.8 / 2
  );
  // ctx.fillText(context.letters, 50, 100)
};

const createInitialsAvatar = (conf, cb) => {
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

  draw(context);

  ctx.fill();
  context.stroke && ctx.stroke();

  const buffer = context.canvas.toBuffer(mimeType);

  return cb(null, {
    contentType: mimeType,
    buffer,
  });
};

module.exports = {
  createInitialsAvatar,
};
