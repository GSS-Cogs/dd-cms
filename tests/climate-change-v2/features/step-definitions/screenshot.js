const { Then } = require('cucumber');
const createScreenshot = require('../support/createScreenshot');

Then('I take a screenshot {string}', async function (filename) {
    await createScreenshot(filename, this.page);
});

Then('I take a screenshot', async function() {
    let buffer = await this.page.screenshot({fullPage: true});
    this.attach(buffer, 'image/png');
})