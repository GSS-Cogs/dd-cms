const { When } = require('cucumber');

When(
    'I click the xpath link {string}', async function(xpath) {
        await this.page.$x(xpath).then(links => links[0].click())
    }
);

When(
    'I click the xpath link {string} and wait for the network to be idle', async function(xpath) {
        await Promise.all([
            this.page.waitForNavigation({waitUntil: "networkidle0"}),
            this.page.$x(xpath).then(links => links[0].click())
        ]);
    }
);

When(
    'I reload the page', async function() {
        await this.page.reload({waitUntil: ["load"]});
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