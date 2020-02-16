const express = require('express')

const respond = require('../utils/respond')

const router = express.Router()

router.get('/', (req, res, next) => {
  respond({
    data: {
      deprecated: true,
      message: 'OK',
      status: 200
    },
    next,
    res
  })
})

module.exports = router
