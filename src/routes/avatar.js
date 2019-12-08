const express = require('express')

const respond = require('./respond')
const createAvatar = require('./../helpers/avatar').createAvatar
const random = require('./../helpers/random')

const router = express.Router()

router.get('/', (req, res, next) => {
  createAvatar(
    req.query,
    (err, data) => {
      respond({
        err,
        res,
        data,
        contentType: 'image/png'
      })
    }
  )
})

router.get('/random', (req, res, next) => {
  createAvatar(
    {
      width: 256,
      height: 256,
      elementWidth: 16,
      color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
      type: random.getRandomShapeType()
    },
    (err, data) => {
      respond({
        err,
        res,
        data,
        contentType: 'image/png'
      })
    }
  )
})

module.exports = router
