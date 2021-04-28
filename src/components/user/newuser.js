import axios from 'axios';
import React from 'react';
// new user form and submit event

// dogma : 서버 주소, 포트번호 저장하는 별도 전역 변수가 있으면 좋겠다.

class NewUser extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  handleSubmit(event) {
    event.preventDefault();
    axios({
      method: 'post',
      url: 'http://192.168.2.6:9000/users/new',
      data: {
        name: document.getElementById("user_name").value,
        id: document.getElementById("user_id").value,
        password: document.getElementById("user_pw").value,
        joinat: new Date()
      }
    });
    window.location.replace("http://192.168.2.6:3000/users");
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="user_name">Name : </label>
          <input type="text" id="user_name" name="name" /><br />
          <label htmlFor="user_id">ID : </label>
          <input type="text" id="user_id" name="id" /><br />
          <label htmlFor="user_pw">Password : </label>
          <input type="password" id="user_pw" name="pw" /><br />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default NewUser