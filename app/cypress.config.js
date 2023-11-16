const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true,
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },

    env: {
      codeCoverage: {
        url: "http://localhost:3003/__coverage__",
      },
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      return config;
    },
    baseUrl: "http://localhost:3000",
  },
});
