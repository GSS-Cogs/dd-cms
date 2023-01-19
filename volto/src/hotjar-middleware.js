const http = require('http');

module.exports = (req, res, next) => {
  const hostname = req.headers.host;
  if (hostname === 'sandbox.climate-change.ukstats.dev') {
    process.env.RAZZLE_RUNTIME_HOTJAR_ID = process.env.HOTJAR_ID_CLIMATE_CHANGE;
  } else if (hostname === 'sandbox.vawg.ukstats.dev') {
    process.env.RAZZLE_RUNTIME_HOTJAR_ID = process.env.HOTJAR_ID_VAWG;
  } else if (hostname === 'sandbox.dcms.ukstats.dev') {
    process.env.RAZZLE_RUNTIME_HOTJAR_ID = process.env.HOTJAR_ID_DCMS;
  } else {
    process.env.RAZZLE_RUNTIME_HOTJAR_ID = '';
  }
  next();
};