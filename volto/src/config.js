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
const hotjarMiddleware = require('./hotjar-middleware');

export default function applyConfig(config) {
  if (__SERVER__) {
    const express = require('express');
    const health = express.Router();
    health.all('/_healthcheck', function (req, res, next) {
      return res.status(200).end();
    });
    const auth = express.Router();
    auth.id = 'basic-auth'
    auth.all('*', function (req, res, next) {
      if (process.env['BASIC_AUTH']) { // only do basic auth when this env var is set
        const req_auth = req.get('authorization');
        if (!(typeof (req_auth) === 'string') || // no auth header
          // if there is an authorization header, then
          (
            req.get('authorization').startsWith('Basic ') && // if the header starts with Basic
            !(req.get('authorization') === 'Basic ' + process.env['BASIC_AUTH']) // and it's not the right login
          )
        ) {
          return res
            .status(401)
            .set('WWW-Authenticate', 'Basic realm="Access to beta"')
            .send('Authentication required.');
        }
      }
      return next();
    });
    config.settings.expressMiddleware = [...config.settings.expressMiddleware, hotjarMiddleware, health, auth];
  }
  config.settings.hasWorkingCopySupport = true;
  return config;
}
