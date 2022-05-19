const fs = require('fs');
const path = require('path');

require('dotenv').config()

const createScreenshot = async (filename, page) => {
    const screenshotPath = process.env.SCREENSHOT_PATH ? process.env.SCREENSHOT_PATH : './test/screenshots';
    const filePath = `${screenshotPath}/manual/${filename}.png`;
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    return await page.screenshot({
        path: filePath,
        fullPage: true
    });
};

module.exports = createScreenshot;