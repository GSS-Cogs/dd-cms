class lhConfig
{
    getUrls() {
        return [
            "http://climate-change.data.gov.uk/",
//            "http://climate-change.data.gov.uk/articles/the-uk-climate-is-changing",
        ];
    }

    connect(browser) {
        return new Promise(async (resolve, reject) => {
            resolve(browser);
        });
    }
}

module.exports = new lhConfig();