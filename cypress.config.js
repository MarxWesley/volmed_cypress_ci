/* eslint-disable no-unused-vars */ 
/* eslint-disable no-undef */

const { defineConfig } = require("cypress");
                                                                                                                                                                                                                                            
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    screenshotOnRunFailure: true,
    video: true,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: false,
      json: true,
      timestamp: 'mmddyyyy_HHMMss',
    },

    defalultCommandTimeout: 60000,
  },
});