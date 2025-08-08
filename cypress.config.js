const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const dotenv = require('dotenv');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const envConfig = dotenv.config().parsed || {};
      config.env = {
        ...config.env,
        ...envConfig,
      };

      allureWriter(on, config);
      return config;
    },

    supportFile: 'src/support/command.js',
    specPattern: 'tests/ui/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'https://www.onliner.by',
    defaultCommandTimeout: 20000,
    pageLoadTimeout: 60000,
  },
});
