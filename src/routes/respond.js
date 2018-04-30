const respond = (conf) => {
    const err = conf.err;
    const res = conf.res;
    const data = conf.data;

    if (err) {
        res.set('Content-Type', 'application/json');
        res.status(400);
        return res.send({
            message: err.message
        });
    }
    res.set('Content-Type', conf.contentType || 'application/json');
    res.status(200);
    res.send(data);
};

module.exports = respond;
