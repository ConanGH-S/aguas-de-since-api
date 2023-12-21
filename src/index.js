import app from './app.js';
import env from './config/env.config.js';

app.listen(env.appPort, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${env.appPort}`);
});
