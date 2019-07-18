const express = require('express')

const respond = require('./respond')

const router = express.Router()

router.get('/', (req, res, next) => {
  respond({
    err: null,
    res,
    data: {
      status: 200,
      message: 'OK'
    }
  })
})

module.exports = router
