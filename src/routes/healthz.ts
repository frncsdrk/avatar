import express from 'express';

import { respond } from '../utils/respond';

const router = express.Router();

/**
 * @api {get} /healthz Request service health
 * @apiName Healthz
 * @apiGroup Health
 *
 * @apiVersion 1.2.0
 *
 * @apiSuccess {String}  message    Message text
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "OK"
 *     }
 */
router.get('/', (req, res, next) => {
  respond({
    data: {
      msg: 'OK',
    },
    next,
    res,
  });
});

export default router;
