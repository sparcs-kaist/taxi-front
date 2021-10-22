import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import backServer from "../../../serverconf";

// db 들어가 있는 방 목록 모두 출력

class Roominfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taxi: [],
    };
  }

  componentDidMount() {
    // FIXME backserver address hard coded
    axios.get(backServer + "/rooms/60abb4cac5b15c35a8d753ed").then((data) => {
      console.log(data);
      this.setState({ taxi: data.data });
    });
  }

  render() {
    return (
      <div className="roominfo">
        <div className="content">
          {((t) => (
            <div
              className="room"
              style={{ marginBottom: "20px", width: "1020px", height: "200px" }}
            >
              <p className="name">Name : {t.name}</p>
              <br />
              <p className="from">From : {t.from}</p>
              <br />
              <p className="to">To : {t.to}</p>
              <br />
              <p className="time">Time : {t.time}</p>
              <p className="madeat">Madeat : {t.madeat}</p>
              <br />
            </div>
          ))(this.state.taxi)}
        </div>
      </div>
    );
  }
}

export default Roominfo;
