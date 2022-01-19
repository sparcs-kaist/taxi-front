import React from "react";
import "./App.css";
import "./Font.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  HashRouter,
} from "react-router-dom";
import Frame from "./components/Frame/Frame";
import Login from "./components/Login/Login";
import Search from "./components/Search/Search";
import Add from "./components/Search/Add";
import SearchResult from "./components/Search/SearchResult/SearchResult";
import Roomlist from "./components/room/Roomlist/Roomlist";
import Roominfo from "./components/room/Roominfo/Roominfo";
import Myroom from "./components/room/Myroom/Myroom";
import Setting from "./components/Setting/Setting";
//import Login from './components/user/login'
import User from "./components/user/user";
import NewUser from "./components/user/newuser";
import Chatting from "./components/Chatting/Chatting";

const SearchResultWithParam = (props) => (
  <Frame navi="search">
    <SearchResult param={useParams().pnum} />
  </Frame>
);

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
        <Route exact path="/search/result/:pnum">
          <SearchResultWithParam />
        </Route>
        <Route exact path="/addroom">
          <Frame navi="addroom">
            <Add isSearch={false} />
          </Frame>
        </Route>
        <Route exact path="/roomlist">
          <Roomlist />
        </Route>
        <Route exact path="/roominfo">
          <Roominfo />
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
