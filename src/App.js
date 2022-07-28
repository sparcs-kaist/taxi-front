import React from "react";
import {
  BrowserRouter,
  Route,
  useParams,
  Router,
  Switch,
  Link,
} from "react-router-dom";
import { useState } from "react";
import Frame from "@components/Frame/Frame";
import Login from "@components/Login/Login";
import Search from "@components/Search/Search/Search";
import AddRoom from "@components/Search/AddRoom/AddRoom";
import Myroom from "@components/Room/Myroom/Myroom";
import MyPage from "@components/MyPage/MyPage";
//import Login from '@components/user/login'
import User from "@components/user/user";
import NewUser from "@components/user/newuser";
import Chatting from "@components/Chatting/Chatting";

import "App.css";
import "Font.css";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/login" component={Login} />
      <Route exact path="/chatting/:roomId" component={Chatting} />
      <Route>
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/addroom" component={AddRoom} />
          <Route exact path="/myroom/:roomId?" component={Myroom} />
          <Route exact path="/MyPage" component={MyPage} />
          <Route exact path="/users">
            <User />
            <Link to="/users/new">New user</Link>
          </Route>
          <Route exact path="/users/new">
            <NewUser />
          </Route>
        </Switch>
        <Frame />
      </Route>
    </BrowserRouter>
  );
}

export default App;
