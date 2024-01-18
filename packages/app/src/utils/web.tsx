import React from "react";
import { renderToString } from "react-dom/server";
import { WebView } from "react-native-webview";

export const web = (Component: React.FC): React.FC => {
  const WrappedWebComponent = () => (
    <WebView
      source={{
        html: renderToString(<Component />),
        // uri: "https://taxi.sparcs.org",
      }}
    />
  );

  return WrappedWebComponent;
};
