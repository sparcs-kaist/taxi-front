import React from "react";
import { renderToString } from "react-dom/server";
import { WebView } from "react-native-webview";

import { Test } from "./Test";

export const Wrapper: React.FC = () => {
  console.log(renderToString(<Test />));

  return (
    <WebView
      originWhitelist={["*"]}
      source={{
        html: renderToString(<Test />),
        // uri: "https://taxi.sparcs.org",
      }}
    />
  );
};
