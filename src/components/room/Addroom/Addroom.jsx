import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { backServer } from "../../../serverconf";

class Addroom extends Component {
  handleSubmit(event) {
    event.preventDefault();
    axios({
      method: "post",
      url: backServer + "/rooms/create",
      data: {
        name: document.getElementById("name").value,
        from: document.getElementById("from").value,
        to: document.getElementById("to").value,
        time: document.getElementById("time").value,
        part: document.getElementById("part").value,
      },
    });
  }

  render() {
    return (
      <div className="page">
        <div className="maintitle"> Make Taxi</div>
        <div className="newtaxi">
          <form onSubmit={this.handleSubmit}>
            <input type="text" id="name" name="name" />
            <br />
            <input type="text" id="from" name="from" />
            <br />
            <input type="text" id="to" name="to" />
            <br />
            <input type="date" id="time" name="time" />
            <br />
            <input type="part" id="part" name="part" />
            <br />
            <button className="button"> Make New Taxi Class </button>
          </form>
        </div>
      </div>
    );
  }
}

Addroom.propTypes = {};
Addroom.defaultProps = {};

export default Addroom;
