import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Frame from "@frames/Frame";
import Login from "@components/Login/Login";
import Search from "@components/Search/Search/Search";
import AddRoom from "@components/Search/AddRoom/AddRoom";
import Myroom from "@components/Room/Myroom/Myroom";
import MyPage from "@components/MyPage/MyPage";
import Chatting from "@components/Chatting/Chatting";

import "App.css";
import "Font.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Frame navi="search">
            <Search isSearch={true} />
          </Frame>
        </Route>
        <Route exact path="/search">
          <Frame navi="search">
            <Search isSearch={true} />
          </Frame>
        </Route>
        <Route exact path="/addroom">
          <Frame navi="addroom">
            <AddRoom />
          </Frame>
        </Route>
        <Route exact path="/myroom">
          <Frame navi="myroom">
            <Myroom />
          </Frame>
        </Route>
        <Route exact path="/MyPage">
          <Frame navi="MyPage">
            <MyPage />
          </Frame>
        </Route>
        <Route exact path="/chatting/:roomId">
          <Chatting />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
