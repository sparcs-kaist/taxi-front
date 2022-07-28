import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Skeleton from "@frames/Skeleton/Skeleton";
import Login from "@components/Login/Login";
import Search from "@components/Search/Search/Search";
import AddRoom from "@components/Search/AddRoom/AddRoom";
import Myroom from "@components/Room/Myroom/Myroom";
import Mypage from "@components/Mypage/Mypage";
import WrapChat from "@components/Chatting/WrapChat";

import "App.css";
import "Font.css";

function App() {
  return (
    <Router>
      <Skeleton>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Search} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/addroom" component={AddRoom} />
          <Route exact path="/myroom" component={Myroom} />
          <Route exact path="/myroom/:roomId" component={Myroom} />
          <Route exact path="/MyPage" component={Mypage} />
          <Route exact path="/chatting/:roomId" component={WrapChat} />
        </Switch>
      </Skeleton>
    </Router>
  );
}

export default App;
