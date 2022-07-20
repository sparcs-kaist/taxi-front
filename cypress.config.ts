import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    "cypress-react-selector": {
      root: "#root",
    },
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  // iPhone X
  viewportWidth: 414,
  viewportHeight: 896,
});
