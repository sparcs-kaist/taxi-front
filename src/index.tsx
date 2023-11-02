import { Suspense } from "react";
import { CookiesProvider } from "react-cookie";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Loading from "@/components/Loading";
import ModalProvider from "@/components/Modal/ModalProvider";
import Skeleton from "@/components/Skeleton";
import AlertProvider from "@/components/Skeleton/AlertProvider";
import Routes from "@/components/Skeleton/Routes";
import SocketToastProvider from "@/components/Skeleton/SocketToastProvider";

import "./Font.css";
import "./index.css";

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
        <ToastContainer />
      </Router>
    </RecoilRoot>
  </CookiesProvider>
);

// create a root to display React components inside a browser DOM node
const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
