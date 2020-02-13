const express = require('express')

const respond = require('./respond')

const router = express.Router()

router.get('/', (req, res, next) => {
  respond({
    err: null,
    res,
    data: {
      msg: 'OK'
    }
  })
})

module.exports = router
