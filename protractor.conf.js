exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'tests/integration/**/*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost:8000/examples/',

  framework: 'jasmine',
  rootElement: 'body',

  jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
    defaultTimeoutInterval: 30000
  }
};