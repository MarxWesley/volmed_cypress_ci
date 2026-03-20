/* eslint-disable no-unused-vars */ 
/* eslint-disable no-undef */

const { defineConfig } = require("cypress");
                                                                                                                                                                                                                                            
module.exports = defineConfig({
  env: {
    "email": "clinica@drdoom.com",
    "password": "drdoom123",
    "requestMode": true
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    video: true,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: false,
      timestamp: 'mmddyyyy_HHMMss',
    },

    defalultCommandTimeout: 60000,
  },
});