import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import ScrollRestoration from "components/Skeleton/ScrollRestoration";
import VirtualKeyboardDetector from "components/Skeleton/VirtualKeyboardDetector";
import ChannelTalkProvider from "components/Skeleton/ChannelTalkProvider";
import GoogleAnalyticsProvier from "components/Skeleton/GoogleAnalyticsProvier";
import I18nextProvider from "components/Skeleton/I18nextProvider";
import AlertProvider from "components/Skeleton/AlertProvider";
import CSSVariablesProvider from "components/Skeleton/CSSVariablesProvider";
import Skeleton from "components/Skeleton";

import Login from "pages/Login/Login";
import LoginFail from "pages/Login/LoginFail";
import Logout from "pages/Login/Logout";
import Home from "pages/Home";
import Search from "pages/Search/Search";
import AddRoom from "pages/Addroom/AddRoom";
import Myroom from "pages/Myroom/Myroom";
import Mypage from "pages/Mypage/Mypage";
import WrapChat from "pages/Chatting/WrapChat";
import PageNotFound from "pages/Error/PageNotFound";

import "App.css";
import "Font.css";

const App = () => {
  return (
    <CookiesProvider>
      <RecoilRoot>
        <Router>
          <ScrollRestoration />
          <VirtualKeyboardDetector />
          <ChannelTalkProvider />
          <GoogleAnalyticsProvier />
          <I18nextProvider />
          <AlertProvider />
          <CSSVariablesProvider />
          <Skeleton>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/login/fail" component={LoginFail} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/addroom" component={AddRoom} />
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
