const express = require('express');

const respond = require('../utils/respond');

const router = express.Router();

/**
 * @api {get} /status Request service status
 * @apiName Status
 * @apiGroup Health
 *
 * @apiVersion 0.1.0
 * @apiDeprecated use (Health:Healthz)
 *
 * @apiSuccess {Boolean} deprecated Deprecated flag
 * @apiSuccess {String}  message    Message text
 * @apiSuccess {Integer} status     Status code
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "deprecated": true,
 *       "message": "OK",
 *       "status": 200
 *     }
 */
router.get('/', (req, res, next) => {
  respond({
    data: {
      deprecated: true,
      message: 'OK',
      status: 200,
    },
    next,
    res,
  });
});

module.exports = router;
