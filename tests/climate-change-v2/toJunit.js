const cucumberJunitConvert = require('cucumber-junit-convert');

const options = {
    inputJsonFile: 'test-results.json',
    outputXmlFile: 'junit.xml',
    featureNameAsClassName: true // default: false
}

cucumberJunitConvert.convert(options);