const express = require('express');

const respond = require('../utils/respond');
const createAvatar = require('./../utils/avatar').createAvatar;
const random = require('./../utils/random');

const router = express.Router();

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

module.exports = router;
