const { When, Given } = require('cucumber');
const { strict: assert } = require("assert");

When('I login using {string} and wait for the element {string}', async function(selector, waitForSelector) {
  const url = 'http://climate-change.data.gov.uk/login?return_url=';

  await Promise.all([
    this.page.waitForSelector(waitForSelector),
    this.page.goto(url),
  ]);
});

When(
  'I click the xpath link {string}', async function(xpath) {
    await this.page.$x(xpath).then(links => links[0].click())
  }
);

When(
  'I click the xpath link {string} and wait for the network to be idle', async function(xpath) {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: "networkidle0" }),
      this.page.$x(xpath).then(links => links[0].click())
    ]);
  }
);

When(
  'I reload the page', async function() {
    await this.page.reload({ waitUntil: ["load"] });
  }
);

When(
  'I wait for navigation to complete', async function() {
    await this.page.waitForNavigation();
  }
);

// This is only available from Puppeteer >= v10.4.0
When(
  'I wait for the network to be idle', async function() {
    await this.page.waitForNetworkIdle();
  }
)

When(
  'I type {string} in the {string} element', async function(text, element) {
    await this.page.focus(element);
    await this.page.keyboard.type(text);
  }
)

When(
  'I wait for xpath {string} to be visible', async function(xpath) {
    await this.page.waitForXPath(xpath, { visible: true });
  }
)

When(
  'I click the {string} element containing {string}', async function(element, text) {
    if (text.includes("login")) {
      await this.page.load('/login?return_url=');
    } else {
      await this.page.$x(`//${element}[contains(text(), '${text}')]`).then(nodes => nodes[0].click())
    }
  }
)

When(
  'the image {string} should decode ok', async function(selector) {
    await this.page.$eval(selector, (img => img.decode()));
  }
)
