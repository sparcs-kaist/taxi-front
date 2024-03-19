import type { Preview } from "@storybook/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "../src/index.css";

import { RecoilRoot } from "recoil";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <RecoilRoot>
        <Router>
          <Story />
        </Router>
      </RecoilRoot>
    ),
  ],
};

export default preview;
