const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl:'https://jsonplaceholder.typicode.com',
    defaultCommandTimeout: 5000,
    pageLoadTimeout: 6000,
    video: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
    "reporter": "mochawesome",
    "reporterOptions": {
      "reportDir": "cypress/reports",
      "overwrite": false,
      "html": false,
      "json": true
    }
});
