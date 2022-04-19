/**
 * Replace with custom razzle config when needed.
 * @module razzle.config
 */

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const jsConfig = require('./jsconfig').compilerOptions;

const pathsConfig = jsConfig.paths;
let voltoPath = './node_modules/@plone/volto';
Object.keys(pathsConfig).forEach((pkg) => {
  if (pkg === '@plone/volto') {
    voltoPath = `./${jsConfig.baseUrl}/${pathsConfig[pkg][0]}`;
  }
});

module.exports = require(`${voltoPath}/razzle.config`);

const origModify = module.exports.modifyWebpackConfig;

module.exports.modifyWebpackConfig = ({
  env: { target, dev },
  webpackConfig,
  webpackObject,
}) => {
  // volto has its own ideas on how to modify the default razzle config.
  // call that first.
  let res = origModify({
    env: { target, dev },
    webpackConfig,
    webpackObject,
  });

  // and now put our own customizations into it.

  // we don't want govuk-react-jsx to be handled as an 'external'
  // during server side rendering.
  // so we override the externals callback that volto registers
  // to add our exception, and then fallback to their original function.
  if (target === 'node') {
    if (
      !Array.isArray(res.externals) ||
      res.externals.length !== 1 ||
      typeof res.externals[0] !== 'function'
    ) {
      throw new Error(
        'Unexpected default externals config, our customization might need changing',
      );
    }
    const origExternals = res.externals[0];

    res.externals[0] = function ddCmsExternals(context, request, callback) {
      if (/(govuk-react-jsx)/.test(request)) {
        callback();
      } else {
        return origExternals(context, request, callback);
      }
    };

    res.plugins = [
      ...res.plugins,
      new CopyPlugin([
        {
          from: path.join(
            __dirname,
            '/node_modules/govuk-frontend/govuk/assets',
          ),
          to: path.join(__dirname, `/${dev ? '' : 'build/'}public/assets`),
        },
      ]),
    ];
  }

  // alias for gss-cogs-chart-builder that means we can keep our imports looking
  // like they use an npm package, while still retaining the mrsdev approach for now.
  // these will both need to be dropped when we actually switch to chart-builder as a
  // package.json dependency.
  res.resolve.alias['gss-cogs-chart-builder/gss-cogs-chart-builder.css'] = path.resolve(__dirname, 'src/addons/volto-chart-builder/dev.css');
  res.resolve.alias['gss-cogs-chart-builder'] = path.resolve(__dirname, 'src/addons/chart-builder/src/library.js');

  return res;
};

module.exports.plugins.push('scss');
