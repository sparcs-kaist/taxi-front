import { Suspense } from "react";
import { CookiesProvider } from "react-cookie";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import routes from "routes";

import Loading from "components/Loading";
import ModalProvider from "components/Modal/ModalProvider";
import Skeleton from "components/Skeleton";
import AlertProvider from "components/Skeleton/AlertProvider";
import CSSVariablesProvider from "components/Skeleton/CSSVariablesProvider";
import ChannelTalkProvider from "components/Skeleton/ChannelTalkProvider";
import FirebaseMessagingProvider from "components/Skeleton/FirebaseMessagingProvider";
import FlutterEventCommunicationProvider from "components/Skeleton/FlutterEventCommunicationProvider";
import GoogleAnalyticsProvier from "components/Skeleton/GoogleAnalyticsProvier";
import I18nextProvider from "components/Skeleton/I18nextProvider";
import ScrollRestoration from "components/Skeleton/ScrollRestoration";
import VirtualKeyboardDetector from "components/Skeleton/VirtualKeyboardDetector";

import "./App.css";
import "./Font.css";

import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <CookiesProvider>
      <RecoilRoot>
        <Router>
          <ScrollRestoration />
          <VirtualKeyboardDetector />
          <ChannelTalkProvider />
          <GoogleAnalyticsProvier />
          <FirebaseMessagingProvider />
          <I18nextProvider />
          <AlertProvider />
          <FlutterEventCommunicationProvider />
          <ModalProvider />
          <CSSVariablesProvider />
          <Skeleton>
            <Suspense fallback={<Loading />}>
              <Switch>
                {routes.map((route) => (
                  <Route key={route.path} {...route} />
                ))}
              </Switch>
            </Suspense>
          </Skeleton>
        </Router>
      </RecoilRoot>
    </CookiesProvider>
  );
};

export default App;
