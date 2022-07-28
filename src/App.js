import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Skeleton from "@frames/Skeleton/Skeleton";
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
      <Skeleton>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Search isSearch={true} />
          </Route>
          <Route exact path="/search">
            <Search isSearch={true} />
          </Route>
          <Route exact path="/addroom">
            <AddRoom />
          </Route>
          <Route exact path="/myroom">
            <Myroom />
          </Route>
          <Route exact path="/MyPage">
            <MyPage />
          </Route>
          <Route exact path="/chatting/:roomId">
            <Chatting />
          </Route>
        </Switch>
      </Skeleton>
    </Router>
  );
}

export default App;
