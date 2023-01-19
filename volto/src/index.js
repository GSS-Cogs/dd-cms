/**
 * Replace with custom runner when needed.
 * @module index
 */

import start from '@plone/volto/start-server';

const middleware = require('./hotjar-middleware');

app.use(middleware);
const reloadServer = start();

if (module.hot) {
  reloadServer();
}
