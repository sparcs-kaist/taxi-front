import { CookiesProvider } from "react-cookie";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Skeleton from "components/Skeleton";
import AlertProvider from "components/Skeleton/AlertProvider";
import CSSVariablesProvider from "components/Skeleton/CSSVariablesProvider";
import ChannelTalkProvider from "components/Skeleton/ChannelTalkProvider";
import FirebaseMessagingProvider from "components/Skeleton/FirebaseMessagingProvider";
import GoogleAnalyticsProvier from "components/Skeleton/GoogleAnalyticsProvier";
import I18nextProvider from "components/Skeleton/I18nextProvider";
import ScrollRestoration from "components/Skeleton/ScrollRestoration";
import VirtualKeyboardDetector from "components/Skeleton/VirtualKeyboardDetector";
import Addroom from "pages/Addroom";
import WrapChat from "pages/Chatting/WrapChat";
import PageNotFound from "pages/Error/PageNotFound";
import Home from "pages/Home";
// import Login from "pages/Login";
import LoginFail from "pages/Login/LoginFail";
import Logout from "pages/Login/Logout";
import Mypage from "pages/Mypage";
import Myroom from "pages/Myroom";
import Search from "pages/Search";

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
          <CSSVariablesProvider />
          <Skeleton>
            <Switch>
              {/* <Route exact path="/login" component={Login} /> */}
              {/* <Route exact path="/login/privacyPolicy" component={Login} /> */}
              <Route exact path="/login/fail" component={LoginFail} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/home/:roomId" component={Home} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/addroom" component={Addroom} />
              <Route exact path="/myroom" component={Myroom} />
              <Route exact path="/myroom/:roomId" component={Myroom} />
              <Route exact path="/mypage" component={Mypage} />
              <Route exact path="/chatting/:roomId" component={WrapChat} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </Skeleton>
        </Router>
      </RecoilRoot>
    </CookiesProvider>
  );
};

export default App;
