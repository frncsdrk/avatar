const express = require('express')

const respond = require('../utils/respond')

const router = express.Router()

router.get('/', (req, res, next) => {
  respond({
    data: {
      status: 200,
      message: 'OK'
    },
    next,
    res
  })
})

module.exports = router
