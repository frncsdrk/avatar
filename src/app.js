const express = require('express');
const cors = require('cors');
const responseTime = require('response-time');
const config = require('config');

const logger = require('./logger');

const avatar = require('./routes/avatar');
const healthz = require('./routes/healthz');
const status = require('./routes/status');

/**
  * Get port from config or use fallback
  */
const getPort = () => {
  return config.has('service.server.port') ? config.get('service.server.port') : 9000;
};

/**
 * Start the app
 */
const start = () => {
  const app = express();

  app.use(express.json());
  app.use(express.text({ limit: '50mb', type: 'text/*' }));
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());

  // Request logging including response time
  app.use(responseTime((req, res, time) => {
    logger.info({
      method: req.method,
      userAgent: req.get('User-Agent'),
      url: req.url,
      statusCode: res.statusCode,
      responseTime: time,
    });
  }));

  app.use('/avatar', avatar);
  app.use('/healthz', healthz);
  app.use('/status', status);

  const server = app.listen(getPort(), () => {
    logger.info('app is running on %s', getPort());
  });
};

module.exports = {
  start,
};
