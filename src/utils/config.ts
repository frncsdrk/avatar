import { Canvas, createCanvas } from 'canvas';

interface IContextConfig {
  [key: string]: any
  canvas?: Canvas,
  ctx?: CanvasRenderingContext2D
  width?: number,
  height?: number,
  elementWidth?: number,
  verticallySymmetric?: boolean,
  horizontallySymmetric?: boolean,
  stroke?: boolean,
  direction?: string,
  letters?: string,
  rotation?: number,
  fontFamily?: string,
  fontSize?: number,
  positionX?: number,
  positionY?: number,
  widthFactor?: number,
  heighFactor?: number,
  bgColor?: string,
  type?: string,
  body?: string
}

/**
 * Parse config values
 * @param {object} conf - config
 * @returns {object} config
 */
const parseConfig = (conf: IContextConfig) => {
  // Ensure the values of the following keys are numbers
  const intKeys = ['width', 'height', 'elementWidth'];
  for (let i = 0; i < intKeys.length; i++) {
    if (conf[intKeys[i]]) {
      conf[intKeys[i]] = parseInt(conf[intKeys[i]], 10);
    }
  }

  // Ensure the values of the following keys are bools
  const boolKeys = ['verticallySymmetric', 'horizontallySymmetric', 'stroke'];
  for (let i = 0; i < boolKeys.length; i++) {
    if (conf[boolKeys[i]]) {
      conf[boolKeys[i]] = conf[boolKeys[i]] === 'true';
    }
  }

  return conf;
};

/**
 * Translate config to context
 * @param {object} conf - config
 * @returns {object} context
 */
const createContext = (conf: IContextConfig) => {
  const canvas = createCanvas(conf.width || 256, conf.height || 256);
  const ctx = canvas.getContext('2d');
  const width = conf.width || 256;
  const height = conf.height || 256;
  const elementWidth = conf.elementWidth || 16;
  const radius = elementWidth / 2;
  const verticallySymmetric = !(
    conf.horizontallySymmetric || conf.verticallySymmetric === false
  );
  const horizontallySymmetric = conf.horizontallySymmetric || false;
  // triangles
  const direction = conf.direction || 'top';
  // /triangles
  // initials
  const letters = conf.letters || 'AA';
  const rotation = conf.rotation || 0;
  const fontFamily = conf.fontFamily || 'Helvetica';
  const fontSize = conf.fontSize || 100;
  const positionX = conf.positionX;
  const positionY = conf.positionY;
  const widthFactor = conf.widthFactor || 1.3;
  const heightFactor = conf.heighFactor || 0.8;
  // /initials

  const elementsPerRow = !verticallySymmetric
    ? width / elementWidth
    : width / elementWidth / 2;
  const elementsPerCol =
    horizontallySymmetric && !verticallySymmetric
      ? height / elementWidth / 2
      : height / elementWidth;

  return {
    canvas,
    ctx,
    width,
    height,
    elementWidth,
    radius,
    verticallySymmetric,
    horizontallySymmetric,
    // triangles
    direction,
    // /triangles
    // initials
    letters,
    rotation,
    fontFamily,
    fontSize,
    positionX,
    positionY,
    widthFactor,
    heightFactor,
    // /initials
    stroke: conf.stroke,
    bgColor: conf.bgColor,
    elementsPerRow,
    elementsPerCol,
    type: conf.type,
    body: conf.body,
  };
};

export {
  IContextConfig,
  parseConfig,
  createContext,
};
