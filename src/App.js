import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { I18nextProvider } from "react-i18next";
import i18n from "lang/i18n";
import ScrollRestoration from "react-scroll-restoration";
import ChannelTalk from "components/Skeleton/ChannelTalk";
import AlertProvider from "components/Skeleton/AlertProvider";
import Skeleton from "components/Skeleton/Skeleton";

import Login from "components/Login/Login";
import Search from "components/Search/Search";
import AddRoom from "components/AddRoom/AddRoom";
import Myroom from "components/Myroom/Myroom";
import Mypage from "components/Mypage/Mypage";
import WrapChat from "components/Chatting/WrapChat";
import Error from "components/Error/Error";

import "App.css";
import "Font.css";

const App = () => {
  return (
    <RecoilRoot>
      <I18nextProvider i18n={i18n}>
        <Router>
          <ScrollRestoration />
          <ChannelTalk />
          <AlertProvider />
          <Skeleton>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Search} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/addroom" component={AddRoom} />
              <Route exact path="/myroom" component={Myroom} />
              <Route exact path="/myroom/:roomId" component={Myroom} />
              <Route exact path="/mypage" component={Mypage} />
              <Route exact path="/chatting/:roomId" component={WrapChat} />
              <Route exact path="/error/:error" component={Error} />
              <Route path="*" component={Error} />
            </Switch>
          </Skeleton>
        </Router>
      </I18nextProvider>
    </RecoilRoot>
  );
};

export default App;
