import js from "@eslint/js";
import cypress from "eslint-plugin-cypress";

export default [
  {
    ignores: [
      "node_modules/**",
      "**/build/**",
      "**/dist/**"
    ]
  },

  js.configs.recommended,

  {
    files: ["cypress/**/*.js"],
    plugins: {
      cypress
    },
    languageOptions: {
      globals: {
        cy: "readonly",
        Cypress: "readonly",
        describe: "readonly",
        it: "readonly",
        context: "readonly",
        before: "readonly",
        beforeEach: "readonly",
        after: "readonly",
        afterEach: "readonly",
      }
    },
    rules: {
      ...cypress.configs.recommended.rules,

      "no-unused-vars": "error",
      "no-console": "off",
      "cypress/assertion-before-screenshot": "error",
      "cypress/no-assigning-return-values": "error",
      "cypress/no-unnecessary-waiting": "error",
      "cypress/no-force": "error",
      "cypress/no-pause": "error",
      "cypress/no-async-tests": "error",
    }
  }
];