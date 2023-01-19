/**
 * Replace with custom runner when needed.
 * @module index
 */

import start from '@plone/volto/start-server';

const middleware = require('./hotjar-middleware');
const reloadServer = start({ middleware });

if (module.hot) {
  reloadServer();
}
