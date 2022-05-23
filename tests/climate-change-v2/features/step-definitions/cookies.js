const { When } = require('cucumber');
const assert = require('assert').strict;

When(
    'I expect there to be no cookies matching {string} set', async function(regex) {
        const re = new RegExp(regex);
        const pageCookies = await this.page.cookies();
        for (let i = 0; i < pageCookies.length; i++) {
            const cookie = pageCookies[i];
            assert(!re.test(cookie.name), `Error: cookie '${cookie.name}' is set with value '${cookie.value}'`);
        }
    }
);

When(
    'I expect there to be cookies matching {string} set', async function(regex) {
        const re = new RegExp(regex);
        const pageCookies = await this.page.cookies();
        let matches = false;
        for (let i = 0; i < pageCookies.length; i++) {
            const cookie = pageCookies[i];
            matches |= re.test(cookie.name)
        }
        assert(matches, `Error: no cookies matching '${regex}' set`);
    }
);

When(
    'I clear cookies', async function() {
        await this.page.cookies().then(cookies => {
            return Promise.all(cookies.map(cookie => this.page.deleteCookie(cookie)))
        });
        const cookies = await this.page.cookies();
        assert(cookies.length === 0);
    }
)

When(
    'I intercept external requests', async function() {
        if (!this.interception) {
            console.log("Setting up interception")
            this.interception = true;
            await this.page.setRequestInterception(true);
            this.page.on('request', req => {
                if (!(req.url().startsWith('http://climate') || req.url().startsWith('data:'))) {
                    console.log(`Requesting external URL ${req.url()}`);
                }
                return Promise.resolve().then(() => req.continue()).catch(e => {});
            });
        } else {
            console.log("Interception already set up")
        }
    }
)