import React, { useState, useEffect } from "react";
import axios from "axios";
import backServer from "../../serverconf";

const User = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(`${backServer}/users`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(users);

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Withdraw</th>
            <th>Ban</th>
            <th>Room</th>
            <th>_id</th>
            <th>Name</th>
            <th>id</th>
            <th>joinAt</th>
          </tr>
        </tbody>
        {users.map((user) => (
          <tbody key={user._id}>
            <tr>
              <td>{user.withdraw}</td>
              <td>{user.ban}</td>
              <td>{user.room}</td>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.id}</td>
              <td>{user.joinat}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default User;
