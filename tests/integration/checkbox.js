'use strict';

describe('example', function() {
  beforeEach(function() {
    browser.driver.get('http://localhost:8000/examples/checkbox.html');
    browser.driver.wait(browser.driver.isElementPresent(by.id("form")), 5000);
    browser.ignoreSynchronization = true; // HACK
  });

  describe('disabled checkbox', function() {
    var checkbox;

    beforeEach(function() {
      checkbox = element(by.css('[field-name=disabled]'));
    });

    it('should show a "Disabled" label', function() {
      expect(checkbox.getText()).toBe("Disabled");
    });

    it('should be disabled based on html attributes', function() {
      expect(checkbox.getAttribute('disabled')).toBe('true');
    });

    it('should not update the model on click', function() {
      expect(element(by.css('[field-name=disabled] md-input-container')).evaluate('bindable')).toBeFalsy();
      checkbox.click();
      expect(element(by.css('[field-name=disabled] md-input-container')).evaluate('bindable')).toBeFalsy();
    });
  });

  describe('enabled checkbox', function() {
    var checkbox;

    beforeEach(function() {
      checkbox = element(by.css('[field-name=enabled]'));
    });

    it('should show a "Disabled" label', function() {
      expect(checkbox.getText()).toBe("Enabled");
    });

    it('should update the model on click', function() {
      expect(element(by.css('[field-name=enabled] md-input-container')).evaluate('bindable')).toBeFalsy();
      checkbox.click();
      expect(element(by.css('[field-name=enabled] md-input-container')).evaluate('bindable')).toBeTruthy();
    });
  });

  describe('default selected checkbox', function() {
    var checkbox;

    beforeEach(function() {
      checkbox = element(by.css('[field-name=defaults]'));
    });

    it('should show a "Disabled" label', function() {
      expect(checkbox.getText()).toBe("Enabled (defaults to selected)");
    });

    it('should update the model on click', function() {
      expect(element(by.css('[field-name=defaults] md-input-container')).evaluate('bindable')).toBeTruthy();
      checkbox.click();
      expect(element(by.css('[field-name=defaults] md-input-container')).evaluate('bindable')).toBeFalsy();
    });
  });
});