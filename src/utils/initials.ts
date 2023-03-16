import { AvatarResultMap, createContext } from './avatar';
import { parseConfig, IContextConfig } from './config';

/**
 * Draw selected shape with context provided
 * @param {object} context
 */
const draw = (context: IContextConfig) => {
  const ctx = context.ctx;
  ctx.font = context.fontSize?.toString() + 'px' + ' ' + context.fontFamily; // default: '30px Helvetica'
  ctx.rotate(context.rotation);
  if (context.type === 'custom') {
    ctx.fillText(
      context.letters,
      context.positionX,
      context.positionY
    );
  } else { // center
    console.log('initials draw context:', context);
    ctx.fillText(
      context.letters,
      context.WIDTH / 2 - context.fontSize! * context.widthFactor! / 2,
      context.HEIGHT / 2 + context.fontSize! * context.heightFactor! / 2
    );
  }
};

const createInitialsAvatar = (conf: IContextConfig, cb: Function) => {
  conf = parseConfig(conf);

  const context = createContext(conf);
  const ctx: CanvasRenderingContext2D = context.ctx;
  const mimeType: string = conf.mimeType || 'image/png';

  if (context.bgColor) {
    ctx.beginPath();
    ctx.fillStyle = conf.bgColor!;
    ctx.fillRect(0, 0, context.width, context.height);
  }

  // NOTE: Need to change colors after bg is drawn
  ctx.fillStyle = conf.color || 'blue';
  ctx.strokeStyle = conf.strokeColor || 'black';

  console.log('initials createInitialsAvatar context:', context);

  draw(context);

  // ctx.fill();
  // context.stroke && ctx.stroke();

  const buffer = context.canvas.toBuffer(mimeType);
  const result:AvatarResultMap = {
    contentType: mimeType,
    buffer
  }

  console.log('initials createInitialsAvatar result:', result);

  return cb(null, result);
};

export {
  createInitialsAvatar
};
