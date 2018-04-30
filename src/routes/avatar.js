const express = require('express');

const respond = require('./respond');
const createAvatar = require('./../helpers/avatar').createAvatar;

const router = express.Router();

router.post('/', (req, res, next) => {
    createAvatar(
        req.body,
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
