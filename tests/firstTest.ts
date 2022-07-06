var wd = require('wd');
var assert = require('assert');
var asserters = wd.asserters;

var desiredCaps = {
  'browserstack.user' : process.env.BROWSERSTACK_USERNAME,
  'browserstack.key' : process.env.BROWSERSTACK_ACCESS_KEY,
  'build' : 'Sky - First App Automate Test',
  'name': 'First Test - Sky - Android',
  'device' : 'Samsung Galaxy S22',
  'app' : 'Sky_Training_App',
  'browserstack.debug' : true,
  'platformName': 'android'
};

var driver = wd.promiseRemote("http://hub-cloud.browserstack.com/wd/hub");

driver
  .init(desiredCaps)
  .then(function () {
    return driver.waitForElementByAccessibilityId('Search Wikipedia', asserters.isDisplayed && asserters.isEnabled, 30000);
  })
  .then(function (searchElement) {
    return searchElement.click();
  })
  .then(function () {
    return driver.waitForElementById('org.wikipedia.alpha:id/search_src_text', asserters.isDisplayed && asserters.isEnabled, 30000);
  })
  .then(function (searchInput) {
    return searchInput.sendKeys("BrowserStack");
  })
  .then(function () {
    return driver.elementsByClassName('android.widget.TextView');   
  })
  .then(function (search_results) {
    assert(search_results.length > 0);
  })
  .fin(function() { return driver.quit(); })
  .done();