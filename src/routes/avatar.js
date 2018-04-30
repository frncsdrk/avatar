const express = require('express');

const respond = require('./respond');
const createAvatar = require('./../helpers/avatar').createAvatar;

const router = express.Router();

router.get('/', (req, res, next) => {
    createAvatar(
        {
            qs: req.qs,
            res
        },
        (err, data) => {
            respond({
                err,
                res,
                data,
                contentType: 'image/png'
            })
        }
    );
});

module.exports = router;
