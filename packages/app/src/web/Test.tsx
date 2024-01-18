import React from "react";

import { web } from "../utils/web";

const Test: React.FC = () => {
  return (
    <div>
      <h1>Hello Webview</h1>
      <p>greetings from webview</p>
    </div>
  );
};

export const Wrapped = web(Test);
