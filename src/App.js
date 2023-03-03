import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import ScrollRestoration from "tools/ScrollRestoration";
import { I18nextProvider } from "react-i18next";
import i18n from "lang/i18n";
import ChannelTalk from "components/Skeleton/ChannelTalk";
import AlertProvider from "components/Skeleton/AlertProvider";
import Skeleton from "components/Skeleton/Skeleton";

import Login from "components/Login/Login";
import LoginFail from "components/Login/LoginFail";
import Logout from "components/Login/Logout";
import Home from "components/Home";
import Search from "components/Search/Search";
import AddRoom from "components/AddRoom/AddRoom";
import Myroom from "components/Myroom/Myroom";
import Mypage from "components/Mypage/Mypage";
import WrapChat from "components/Chatting/WrapChat";
import PageNotFound from "components/Error/PageNotFound";

import "App.css";
import "Font.css";

const App = () => {
  return (
    <CookiesProvider>
      <RecoilRoot>
        <Router>
          <ScrollRestoration />
          <ChannelTalk />
          <AlertProvider />
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
