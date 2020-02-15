const express = require('express')

const respond = require('../utils/respond')

const router = express.Router()

router.get('/', (req, res, next) => {
  respond({
    data: {
      msg: 'OK'
    },
    next,
    res
  })
})

module.exports = router
