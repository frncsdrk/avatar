import express from 'express';
import cors    from 'cors';
import config  from 'config';

import avatar  from './routes/avatar';
import healthz from './routes/healthz';
import status  from './routes/status';

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

  app.listen(config.get('service.server.port'), () => {
    console.log('app is running on', config.get('service.server.port'));
  });
};

export {
  start,
};
