'use strict';

describe('example', function() {
  beforeEach(function() {
    browser.driver.get('http://localhost:8000/examples/radio.html');
    browser.driver.wait(browser.driver.isElementPresent(by.id("form")), 5000);
  });

  describe('radios', function() {
    it('should disable disabled radios', function() {
      var radios = element(by.model('string')).all(by.repeater('option in bindableOptions'));

      expect(radios.count()).toBe(2);
      expect(radios.get(0).getAttribute('disabled')).toBe('disabled');
    });
  });
});