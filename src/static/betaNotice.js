import React from "react";
import theme from "styles/theme";

export default (
  <div
    style={{
      padding: "0 8px",
      textAlign: "left",
      width: "100%",
      boxSizing: "border-box",
      lineHeight: "20px",
    }}
  >
    <b style={{ color: theme.purple }}>Taxi 베타 서비스</b>에 대해 안내드립니다.{" "}
    <br />
    <br />
    <ol style={{ paddingLeft: "20px" }}>
      <li>
        베타 서비스란 서비스 정식 출시 이전의 가오픈과 같은 개념으로 서비스의
        상태가 불안정할 수 있다는 점 양해 부탁드립니다.
      </li>
      <li>
        또한 현재도 개발이 진행 중인 상태이기에 베타 서비스 기간 중에는 기능의
        변화가 생길 수 있다는 점 말씀드립니다.
      </li>
      <li>
        현재 Taxi <b>앱 개발</b> 또한 진행 중입니다. 정식 출시 시에는 Taxi 앱을
        통해 서비스를 이용하실 수 있습니다.
      </li>
      <li>
        혹시 서비스 사용 중 불편한 점이 있거나 예상치 못한 버그가 발생했을 경우{" "}
        <b>마이 페이지</b>의 <b>채널톡 문의하기</b>를 통해 알려주시면
        감사하겠습니다.
      </li>
      <li>
        여러분의 서비스 사용 경험을 바탕으로 더 나은 서비스를 만들기 위해 노력
        중이오니 많은 관심 부탁드립니다.
      </li>
    </ol>
  </div>
);
