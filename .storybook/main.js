import path from "path";

const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    // Ensure config.resolve is an object if it doesn't already exist

    config.resolve = config.resolve || {};

    // Add support for absolute path imports
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, "../src"), // This should point to your src directory
    ];

    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-react",
                { runtime: "automatic", importSource: "@emotion/react" },
              ],
              "@babel/preset-typescript",
              [
                "@babel/preset-env",
                {
                  targets: {
                    chrome: 100,
                    safari: 15,
                    firefox: 91,
                  },
                },
              ],
            ],
            plugins: ["@emotion/babel-plugin"],
          },
        },
      ],
      include: path.resolve(__dirname, "../src"),
    });

    return config;
  },
};
export default config;
