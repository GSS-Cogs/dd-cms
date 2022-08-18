/**
 * Add your config changes here.
 * @module config
 * @example
 * export default function applyConfig(config) {
 *   config.settings = {
 *     ...config.settings,
 *     port: 4300,
 *     listBlockTypes: {
 *       ...config.settings.listBlockTypes,
 *       'my-list-item',
 *    }
 * }
 */

// All your imports required for the config here BEFORE this line
import '@plone/volto/config';

export default function applyConfig(config) {
  if (__SERVER__) {
    const express = require('express');
    const middleware = express.Router();
    middleware.id = 'basic-auth'
    middleware.all('*', function (req, res, next) {
      if (process.env['BASIC_AUTH'] && (
          !req.headers.authorization || (
              (req.headers.authorization.search('Basic ') === 0) &&
              (req.headers.authorization === 'Basic ' + process.env['BASIC_AUTH'])
          )
      )) {
        return res
            .status(401)
            .set('WWW-Authenticate', 'Basic realm="COP 27 beta site"')
            .send('Authentication required.');
      }
      return next();
    });
    config.settings.expressMiddleware = [...config.settings.expressMiddleware, middleware];
  }
  return config;
}
