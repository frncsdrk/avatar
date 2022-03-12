const express = require('express');

const respond = require('../utils/respond');
const { createAvatar } = require('./../utils/avatar');
const { createInitialsAvatar } = require('./../utils/initials');
const random = require('./../utils/random');

const router = express.Router();

/**
 * @api {get} /avatar Request avatar image
 * @apiName GetAvatar
 * @apiGroup Avatar
 *
 * @apiVersion 1.4.0
 *
 * @apiQuery {Number} [width=256] Width in px
 * @apiQuery {Number} [height=256] Height in px
 * @apiQuery {Boolean} [verticallySymmetric=true] Render avatar vertically symmetric
 * @apiQuery {Boolean} [horizontallySymmetric=false] Render avatar horizontally symmetric (will only be used if verticallySymmetric is explicitly turned off)
 * @apiQuery {String}  [direction='top'] Direction in which triangles should point
 * @apiQuery {String='square','circle','triangle'}  [type='square'] Type of shape to use for avatar
 * @apiQuery {Number} [elementWidth=16] Width of singular shapes in px
 * @apiQuery {String}  [color='blue'] Color of elements
 * @apiQuery {String}  [bgColor=none] Background color
 * @apiQuery {Boolean} [stroke=false] Add stroke to outline elements
 * @apiQuery {String}  [strokeColor] Color of stroke
 * @apiQuery {String}  [mimeType='image/png'] Specify MIME type of image
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     Image
 */
router.get('/', (req, res, next) => {
  createAvatar(req.query, (err, data) => {
    respond({
      contentType: data.contentType,
      data: data.buffer,
      err,
      next,
      res,
    });
  });
});

/**
 * @api {post} /avatar Create specified avatar
 * @apiName CreateAvatar
 * @apiGroup Avatar
 *
 * @apiVersion 1.4.0
 *
 * @apiBody {text/plain} body Avatar pattern, where every '#' is a shape
 *
 * @apiQuery {Number} [width=256] Width in px
 * @apiQuery {Number} [height=256] Height in px
 * @apiQuery {Boolean} [verticallySymmetric=true] Render avatar vertically symmetric
 * @apiQuery {Boolean} [horizontallySymmetric=false] Render avatar horizontally symmetric (will only be used if verticallySymmetric is explicitly turned off)
 * @apiQuery {String}  [direction='top'] Direction in which triangles should point
 * @apiQuery {String='square','circle','triangle'}  [type='square'] Type of shape to use for avatar
 * @apiQuery {Number} [elementWidth=16] Width of singular shapes in px
 * @apiQuery {String}  [color='blue'] Color of elements
 * @apiQuery {String}  [bgColor=none] Background color
 * @apiQuery {Boolean} [stroke=false] Add stroke to outline elements
 * @apiQuery {String}  [strokeColor] Color of stroke
 * @apiQuery {String}  [mimeType='image/png'] Specify MIME type of image
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     Image
 */
router.post('/', (req, res, next) => {
  createAvatar(
    {
      body: req.body,
      verticallySymmetric: false,
      ...req.query,
    },
    (err, data) => {
      respond({
        contentType: data.contentType,
        data: data.buffer,
        err,
        next,
        res,
      });
    }
  );
});

/**
 * @api {get} /avatar/random Request random avatar image
 * @apiName GetRandomAvatar
 * @apiGroup Avatar
 *
 * @apiVersion 1.4.0
 *
 * @apiQuery {Number} width=256 Width in px
 * @apiQuery {Number} height=256 Height in px
 * @apiQuery {Boolean} verticallySymmetric=true Render avatar vertically symmetric
 * @apiQuery {Boolean} horizontallySymmetric=false Render avatar horizontally symmetric (will only be used if verticallySymmetric is explicitly turned off)
 * @apiQuery {String}  direction='top' Direction in which triangles should point
 * @apiQuery {String='square','circle','triangle'}  type='square' Type of shape to use for avatar
 * @apiQuery {Number} elementWidth=16 Width of singular shapes in px
 * @apiQuery {String}  color='blue' Color of elements
 * @apiQuery {String}  bgColor=none Background color
 * @apiQuery {Boolean} stroke=false Add stroke to outline elements
 * @apiQuery {String}  strokeColor Color of stroke
 * @apiQuery {String}  mimeType='image/png' Specify MIME type of image
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     Image
 */
router.get('/random', (req, res, next) => {
  createAvatar(
    {
      width: 256,
      height: 256,
      elementWidth: 16,
      color: '#' + ((Math.random() * 0xffffff) << 0).toString(16),
      type: random.getRandomShapeType(),
      ...req.query,
    },
    (err, data) => {
      respond({
        contentType: data.contentType,
        data: data.buffer,
        err,
        next,
        res,
      });
    }
  );
});

/**
 * @api {get} /avatar/initials Request initials avatar image
 * @apiName GetInitialsAvatar
 * @apiGroup Avatar
 *
 * @apiVersion 1.5.0
 *
 * @apiQuery {String} letters The initials to be used for the avatar
 * @apiQuery {String} [type='center'] Type of position calculation (default: 'center')
 * @apiQuery {Number} [widthFactor=1.3] For correction of position on the X-axis (default: 1.3) (only relevant for type 'center')
 * @apiQuery {Number} [heightFactor=0.8] For correction of position on the Y-axis (default: 0.8) (only relevant for type 'center')
 * @apiQuery {Number} [positionX] Position on the X-axis (only relevant for type 'custom')
 * @apiQuery {Number} [positionY] Position on the Y-axis (only relevant for type 'custom')
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     Image
 */
router.get('/initials', (req, res, next) => {
  createInitialsAvatar(
    {
      color: '#' + ((Math.random() * 0xffffff) << 0).toString(16),
      type: 'center',
      ...req.query,
    },
    (err, data) => {
      respond({
        contentType: data.contentType,
        data: data.buffer,
        err,
        next,
        res,
      });
    }
  );
});

module.exports = router;
