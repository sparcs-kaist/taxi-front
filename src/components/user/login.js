import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
// login function

const Login = () => {
  // constructor(props) {
  //   super(props);
  // }
  const [loginres, setRes] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios({
      method: 'post',
      url: 'http://192.168.2.6:9000/users/login',
      data: {
        id: document.getElementById("user_id").value,
        password: document.getElementById("user_pw").value
      }
    })
      .then(res => setRes(res.data))
      .catch(err => console.log(err))
    // window.location.replace("http://192.168.2.6:3000/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user_id">ID : </label>
        <input type="text" id="user_id" name="id" value={id} onChange={e => setId(e.target.value)} /><br />
        <label htmlFor="user_pw">Password : </label>
        <input type="password" id="user_pw" name="pw" value={pw} onChange={e => setPw(e.target.value)} /><br />
        <input type="submit" value="submit" />
      </form>
      <p id="login_result">{loginres}</p>
    </div>
  );
}

export default Login