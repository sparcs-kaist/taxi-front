import { Suspense } from "react";
import { CookiesProvider } from "react-cookie";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import Loading from "components/Loading";
import ModalProvider from "components/Modal/ModalProvider";
import Skeleton from "components/Skeleton";
import AlertProvider from "components/Skeleton/AlertProvider";
import Routes from "components/Skeleton/Routes";
import SocketToastProvider from "components/Skeleton/SocketToastProvider";

import "./App.css";
import "./Font.css";

import { RecoilRoot } from "recoil";

const App = () => (
  <CookiesProvider>
    <RecoilRoot>
      <Router>
        <SocketToastProvider />
        <AlertProvider />
        <ModalProvider />
        <Skeleton>
          <Suspense fallback={<Loading center />}>
            <Routes />
          </Suspense>
        </Skeleton>
      </Router>
    </RecoilRoot>
  </CookiesProvider>
);

// create a root to display React components inside a browser DOM node
const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
