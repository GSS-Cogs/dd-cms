/*
Whenever we get a request, select the RAZZLE_RUNTIME_HOTJAR_ID based
on the host the request was received on.
The actual hotjar IDs are provided via IAC created environment variables.

Notes:
- Using indexOf as its cleaner than regex and gets us to the same place.
  i.e found an instance of string ".<SITE>." in host.
  Note: Index of -1 is js for "did not find" so 0+ is found.
- Any vanity CNAME records we use to direct here MUST also match the
  expected domain pattern: *.<SITE>.* otherwise RAZZLE_RUNTIME_HOTJAR_ID
  will fall through to the default "" else clause. If we stray from this
  pattern we'll need to add an appropriate conditional to catch the new host.
*/

module.exports = (req, _, next) => {
  const hostname = req.headers.host;
  if (hostname.indexOf(".climate-change.") > -1) {
    process.env.RAZZLE_RUNTIME_HOTJAR_ID = process.env.HOTJAR_ID_CLIMATE_CHANGE;
  } else if (hostname.indexOf(".vawg.") > -1) {
    process.env.RAZZLE_RUNTIME_HOTJAR_ID = process.env.HOTJAR_ID_VAWG;
  } else if (hostname.indexOf(".dcms.") > -1) {
    process.env.RAZZLE_RUNTIME_HOTJAR_ID = process.env.HOTJAR_ID_DCMS;
  } else {
    process.env.RAZZLE_RUNTIME_HOTJAR_ID = "";
  }
  console.log(`Request to ${hostname}${req.url}, has Hotjar ID: "${process.env.RAZZLE_RUNTIME_HOTJAR_ID}"`);
  next();
};
