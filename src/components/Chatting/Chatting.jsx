import React from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Input from "./Input/Input";

const Chatting = (props) => {
  const roomId = 0;
  return (
    <div>
      <Header/>
      <Main/>
      <Input/>
    </div>
  )
}

export default Chatting;
