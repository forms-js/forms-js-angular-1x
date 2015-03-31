/**
 * Silly example test to demonstrate Jasmine syntax (and check my gulpfile testing).
 */
describe('Example', function() {

  var rejectedWith;
  var resolvedWith;

  beforeEach(function() {
    // TODO setup

    // Install polyfill if the browser doesn't support ES6 Promises.
    ES6Promise.polyfill();

    // Install mock-clock since Promise polyfill is forced-async for resolutions.
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('should pass the dummy test', function() {
    expect(true).toBeTruthy();
  });
});