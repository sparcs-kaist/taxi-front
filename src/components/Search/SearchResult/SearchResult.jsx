import React, { Component } from "react";
import Title from "../../Frame/Title/Title";
import axios from "../../Tool/axios";
import Proptypes from "prop-types"

import svgSearch from "./svg_search.svg";


SearchResult.propTypes = {
  param: Proptypes.any
}
export default class SearchResult extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.onCall !== this.props.param) {
      this.onCall = this.props.param;
      const roomName = this.props.param.split("&")[0];
      const depPlace = this.props.param.split("&")[1];
      const arrPlace = this.props.param.split("&")[2];
      const depHour = this.props.param.split("&")[3];
      const depMin = this.props.param.split("&")[4];

      console.log(depPlace, arrPlace);
      axios
        .post("/rooms/search", { fromName: depPlace, toName: arrPlace })
        .then((result) => {
          console.log(result.data);
        });
    }

    return (
      <div>
        <div style={{ height: "20px" }} />
        <Title img={svgSearch}>검색 결과</Title>
      </div>
    );
  }
}
