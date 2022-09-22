const {BeforeAll, setDefaultTimeout} = require('cucumber');

BeforeAll(function() {
   setDefaultTimeout(120 * 1000);
});
