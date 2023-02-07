/*
Whenever we get a request, select the RAZZLE_RUNTIME_HOTJAR_ID based
on the host the request was received on.
The actual hotjar IDs are set via IAC created environment variables.

Notes:
- Using indexOf as its clearer than regex and gets us to the same place.
  i.e exactle one instance of ".<SITE>."
- Any vanity CNAME records we use to direct here MUST also match the
  expected domain pattern: *.<SITE>.* otherwise RAZZLE_RUNTIME_HOTJAR_ID
  will fall through to the default "" else clause.
*/

module.exports = (req, res, next) => {
  const hostname = req.headers.host;
  if (hostname.indexOf(".climate-change.") !== -1) {
    process.env.RAZZLE_RUNTIME_HOTJAR_ID = process.env.HOTJAR_ID_CLIMATE_CHANGE;
  } else if (hostname.indexOf(".vawg.") !== -1) {
    process.env.RAZZLE_RUNTIME_HOTJAR_ID = process.env.HOTJAR_ID_VAWG;
  } else if (hostname.indexOf(".dcms.") !== -1) {
    process.env.RAZZLE_RUNTIME_HOTJAR_ID = process.env.HOTJAR_ID_DCMS;
  } else {
    process.env.RAZZLE_RUNTIME_HOTJAR_ID = "";
  }
  console.log(`Hotjar ID: ${process.env.RAZZLE_RUNTIME_HOTJAR_ID}`);
  next();
};
