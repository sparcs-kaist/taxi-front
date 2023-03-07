import theme from "styles/theme";

export default (
  <div
    style={{
      margin: "-8px 0px",
      padding: "0 8px",
      textAlign: "left",
      width: "100%",
      boxSizing: "border-box",
      lineHeight: "20px",
      maxHeight: "calc(100vh - 240px)",
      overflow: "auto",
    }}
  >
    <b style={{ color: theme.purple }}>Taxi 베타 서비스</b>에 대해 안내드립니다.{" "}
    <br /> <br />
    <ol style={{ padding: "0 4px 0 20px" }}>
      <li>
        The <b>English version</b> of the service is also currently under
        development and will be available from the official launch.
      </li>
      <li>
        베타 서비스 기간은 <b>11월 21일</b>까지이며 베타 서비스란 서비스 정식
        출시 이전의 <b>가오픈</b>과 같은 개념으로 서비스의 상태가 불안정할 수
        있다는 점 양해 부탁드립니다.
      </li>
      <li>
        서비스 개발이 여전히 진행 중인 상태이기에 베타 서비스 기간 중에도 기능의
        변화가 생길 수 있다는 점 말씀드립니다.
      </li>
      <li>
        모바일에서의 편리한 서비스 사용을 위해 Taxi의 <b>앱 버전</b> 또한 현재
        개발 중에 있습니다.
      </li>
      <li>
        서비스 사용 중 불편한 점이 있거나 예상치 못한 버그가 발생했을 경우{" "}
        <b>마이 페이지</b>의 <b>채널톡 문의하기</b>를 통해 알려주시면
        감사하겠습니다.
      </li>
      <li>
        여러분의 서비스 사용 경험을 바탕으로 더 나은 서비스를 만들기 위해
        노력하겠습니다. 많은 관심 부탁드립니다.
      </li>
    </ol>
  </div>
);
