import React, { Component } from "react";
import axios from "../../Tool/axios";
import WhiteContainer from "../../Frame/WhiteContainer/WhiteContainer";
import RoomElement from "../Myroom/RoomElement";
import Footer from "../../Frame/Footer";

// for test
// db 들어가 있는 방 목록 모두 출력


class Roomlist extends Component {
  constructor(props) {
    super(props);
    this.state = { taxi: [] };
  }

  componentDidMount() {
    axios.get("/rooms/getAllRoom").then((res) => {
      console.log(res.data);
      this.setState({ taxi: res.data });
    });
  }

  render() {
    return (
      <>
        <WhiteContainer title="모든 방 (for test)">
          {this.state.taxi.map((item, index) => (
            <RoomElement
              key={index}
              title={item.name}
              partLen={item.part.length}
              partImgs={[]}
              subtitle={`${item.from} > ${item.to}, ${item.time}`}
            />
          ))}
        </WhiteContainer>
        <Footer />
      </>
    );
  }
}

export default Roomlist;
