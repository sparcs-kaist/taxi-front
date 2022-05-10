import React from "react";
import "./App.css";
import "./Font.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Frame from "./components/Frame/Frame";
import Login from "./components/Login/Login";
import Search from "./components/Search/Search/Search";
import AddRoom from "./components/Search/AddRoom/AddRoom";
import Myroom from "./components/Room/Myroom/Myroom";
import Setting from "./components/Setting/Setting";
//import Login from './components/user/login'
import User from "./components/user/user";
import NewUser from "./components/user/newuser";
import Chatting from "./components/Chatting/Chatting";

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
        <Route exact path="/setting">
          <Frame navi="setting">
            <Setting />
          </Frame>
        </Route>
        <Route exact path="/users">
          <User />
          <Link to="/users/new">New user</Link>
        </Route>
        <Route exact path="/users/new">
          <NewUser />
        </Route>
        <Route exact path="/chatting/:roomId">
          <Chatting />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
