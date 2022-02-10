/**
 * Replace with custom razzle config when needed.
 * @module razzle.config
 */

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
      if (/govuk-react-jsx/.test(request)) {
        callback();
      } else {
        return origExternals(context, request, callback);
      }
    };
  }

  return res;
};

module.exports.plugins.push('scss');
