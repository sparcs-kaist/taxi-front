import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollRestoration from "react-scroll-restoration";
import { RecoilRoot } from "recoil";
import Skeleton from "components/Skeleton/Skeleton";
import ChannelTalk from "components/Skeleton/ChannelTalk";

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
      <Router>
        <ScrollRestoration />
        <ChannelTalk />
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
    </RecoilRoot>
  );
};

export default App;
