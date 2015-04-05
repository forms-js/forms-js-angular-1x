'use strict';

describe('example', function() {
  beforeEach(function() {
    browser.driver.get('http://localhost:8000/examples/radio.html');
    browser.driver.wait(browser.driver.isElementPresent(by.id("form")), 5000);
    browser.ignoreSynchronization = true; // HACK
  });

  describe('string radio group', function() {
    var radios;

    beforeEach(function() {
      radios = element.all(by.css('[field-name=string] md-radio-button'));
    });

    it('should render 2 radio options', function() {
      expect(radios.count()).toBe(2);
    });

    it('should be disabled based on html attributes', function() {
      expect(radios.get(0).getAttribute('disabled')).toBe('true');
      expect(radios.get(1).getAttribute('disabled')).toBe('true');
    });

    it('should show "Female" and "Male" string options', function() {
      expect(radios.get(0).getAttribute('value')).toBe('Female');
      expect(radios.get(1).getAttribute('value')).toBe('Male');
    });

    it('should not update the model on click', function() {
      expect(element(by.css('[field-name=string] md-radio-group')).evaluate('bindable')).toBeFalsy();
      radios.get(1).click();
      expect(element(by.css('[field-name=string] md-radio-group')).evaluate('bindable')).toBeFalsy();
    });
  });

  describe('number radio group', function() {
    var radios;

    beforeEach(function() {
      radios = element.all(by.css('[field-name=number] md-radio-button'));
    });

    it('should render 3 radio options', function() {
      expect(radios.count()).toBe(3);
    });

    it('should pre-select option 2 by default', function() {
      expect(radios.get(0).getAttribute('aria-checked')).toBe('false');
      expect(radios.get(1).getAttribute('aria-checked')).toBe('true');
      expect(radios.get(2).getAttribute('aria-checked')).toBe('false');
    });

    it('should show 1, 2, and 3 numeric options', function() {
      expect(radios.get(0).getAttribute('value')).toBe('1');
      expect(radios.get(1).getAttribute('value')).toBe('2');
      expect(radios.get(2).getAttribute('value')).toBe('3');
    });

    it('should update the model if a different option is clicked', function() {
      expect(element(by.css('[field-name=number] md-radio-group')).evaluate('bindable')).toBe(2);
      radios.get(0).click();
      expect(element(by.css('[field-name=number] md-radio-group')).evaluate('bindable')).toBe('1'); // HACK
    });
  });

  describe('boolean radio group', function() {
    var radios;

    beforeEach(function() {
      radios = element.all(by.css('[field-name=boolean] md-radio-button'));
    });

    it('should render 2 radio options', function() {
      expect(radios.count()).toBe(2);
    });

    it('should show true and false options', function() {
      expect(radios.get(0).getAttribute('value')).toBe('true');
      expect(radios.get(1).getAttribute('value')).toBe('false');
    });
  });

  describe('complex radio group', function() {
    var radios;

    beforeEach(function() {
      radios = element.all(by.css('[field-name=complex] md-radio-button'));
    });

    it('should render 2 options', function() {
      expect(radios.count()).toBe(2);
    });

    it('should pre-select option Foo by default', function() {
      expect(radios.get(0).getAttribute('aria-checked')).toBe('true');
      expect(radios.get(1).getAttribute('aria-checked')).toBe('false');
    });

    it('should show "foo" and "bar" options', function() {
      expect(radios.get(0).getAttribute('value')).toBe('foo');
      expect(radios.get(1).getAttribute('value')).toBe('bar');
    });

    it('should update the model if a different option is clicked', function() {
      expect(element(by.css('[field-name=complex] md-radio-group')).evaluate('bindable')).toBe('foo');
      radios.get(1).click();
      expect(element(by.css('[field-name=complex] md-radio-group')).evaluate('bindable')).toBe('bar');
    });
  });
});