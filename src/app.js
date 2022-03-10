const express = require('express');
const cors = require('cors');
const config = require('config');

const avatar = require('./routes/avatar');
const healthz = require('./routes/healthz');
const status = require('./routes/status');

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

  const server = app.listen(config.get('service.server.port'), () => {
    console.log('app is running on', server.address().port);
  });
};

module.exports = {
  start,
};
