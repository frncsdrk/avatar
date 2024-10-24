const express = require('express');
const cors = require('cors');
const config = require('config');

const avatar = require('./routes/avatar');
const healthz = require('./routes/healthz');
const status = require('./routes/status');

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

  app.use('/avatar', avatar);
  app.use('/healthz', healthz);
  app.use('/status', status);

  const server = app.listen(getPort(), () => {
    console.log('app is running on', getPort());
  });
};

module.exports = {
  start,
};
