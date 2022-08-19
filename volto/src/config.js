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
    const health = express.Router();
    health.all('/_healthcheck', function(req, res, next) {
      return res.status(200).end();
    });
    const auth = express.Router();
    auth.id = 'basic-auth'
    auth.all('*', function (req, res, next) {
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
    config.settings.expressMiddleware = [...config.settings.expressMiddleware, health, auth];
  }
  return config;
}
