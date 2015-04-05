'use strict';

describe('example', function() {
  var input, label, text;

  beforeEach(function() {
    browser.driver.get('http://localhost:8000/examples/text.html');
    browser.driver.wait(browser.driver.isElementPresent(by.id("form")), 5000);
    browser.ignoreSynchronization = true; // HACK
  });

  var findElements = function(fieldName) {
    input = element(by.css('[field-name=' + fieldName + '] input'));
    label = element(by.css('[field-name=' + fieldName + '] label'));
    text = element(by.css('[field-name=' + fieldName + ']'));
  };

  describe('disabled text', function() {
    beforeEach(function() {
      findElements('disabled');
    });

    it('should show a "Disabled" label', function() {
      expect(label.getText()).toBe("Disabled");
    });

    it('should be disabled based on html attributes', function() {
      expect(input.getAttribute('disabled')).toBe('true');
    });
  });

  describe('enabled text', function() {
    beforeEach(function() {
      findElements('enabled');
    });

    it('should show a "Enabled" label', function() {
      expect(text.getText()).toBe("Enabled with placeholder");
    });

    it('should show an input placeholder', function() {
      expect(input.getAttribute("data-placeholder")).toBe("Helpful text goes here");
    });

    it('should update the model when text is entered', function() {
      expect(input.evaluate('bindable')).toBeFalsy();
      input.sendKeys('new value');
      expect(input.evaluate('bindable')).toBe('new value');
    });
  });

  describe('default selected text', function() {
    beforeEach(function() {
      findElements('defaults');
    });

    it('should show a "Enabled..." label', function() {
      expect(text.getText()).toBe("Enabled (defaults to Hello)");
    });

    it('should show the appropriate initial value', function() {
      expect(input.getAttribute('value')).toBe("Hello");
    });

    it('should update the model when new text is entered', function() {
      input.evaluate('bindable').then(function(value) {
        expect(value).toBe('Hello');

        input.clear();
        input.evaluate('bindable').then(function(value) {
          expect(value).toBeFalsy();

          input.sendKeys('Hi');
          input.evaluate('bindable').then(function(value) {
            expect(value).toBe('Hi');
          });
        });
      });
    });
  });
});