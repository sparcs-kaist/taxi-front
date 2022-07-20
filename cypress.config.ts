import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    "cypress-react-selector": {
      root: "#root",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
