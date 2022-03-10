/**
 * Response helper
 * @param {object} conf - config
 */
const respond = (conf) => {
  if (typeof conf !== 'object') {
    return false;
  }

  const contentType = conf.contentType;
  const data = conf.data;
  const err = conf.err;
  const next = conf.next;
  const res = conf.res;
  const status = conf.status;

  if (typeof next !== 'function') {
    return false;
  }

  if (err) {
    res.set('Content-Type', 'application/json');
    res.status(status || 400);
    res.send({
      message: err.message,
    });
    return next();
  }
  res.set('Content-Type', contentType || 'application/json');
  res.status(200);
  res.send(data);

  return next();
};

module.exports = respond;
