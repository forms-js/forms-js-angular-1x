'use strict';

describe('example', function() {
  beforeEach(function() {
    browser.driver.get('http://localhost:8000/examples/index.html');
    //browser.driver.wait(browser.driver.isElementPresent(by.id("form")), 5000);
  });

  describe('manual markup', function() {
    it('should render a text input', function() {
      var emailInput = element(by.id('attributeMetadata.form.formData.email'));

      expect(emailInput).toBeTruthy();
      expect(emailInput.getAttribute('value')).toBe('briandavidvaughn@gmail.com');
    });
  });
});