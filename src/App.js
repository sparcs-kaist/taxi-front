import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const MyRoomWithParam = () => {
  const [showFH, setShowFH] = useState();

  if (showFH) {
    return (
      <Frame navi="search">
        <Myroom param={useParams().roomId} setShowFH={setShowFH} />
      </Frame>
    );
  } else {
    return <Myroom param={useParams().roomId} setShowFH={setShowFH} />;
  }
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Frame />}>
          <Route path="login" element={<Login />} />
          <Route path />
        </Route>
      </Routes>
    </BrowserRouter>
    // <Router>
    //   <Switch>
    //     <Route exact path="/login">
    //       <Login />
    //     </Route>
    //     <Route exact path="/">
    //       <Frame navi="search">
    //         <Search isSearch={true} />
    //       </Frame>
    //     </Route>
    //     <Route exact path="/search">
    //       <Frame navi="search">
    //         <Search isSearch={true} />
    //       </Frame>
    //     </Route>
    //     <Route exact path="/addroom">
    //       <Frame navi="addroom">
    //         <AddRoom />
    //       </Frame>
    //     </Route>
    //     <Route exact path="/myroom/:roomId?">
    //       <MyRoomWithParam />
    //     </Route>
    //     <Route exact path="/MyPage">
    //       <Frame navi="MyPage">
    //         <MyPage />
    //       </Frame>
    //     </Route>
    //     <Route exact path="/users">
    //       <User />
    //       <Link to="/users/new">New user</Link>
    //     </Route>
    //     <Route exact path="/users/new">
    //       <NewUser />
    //     </Route>
    //     {/* <Route exact path="/chatting/:roomId">
    //       <Chatting />
    //     </Route> */}
    //   </Switch>
    // </Router>
  );
}

export default App;
