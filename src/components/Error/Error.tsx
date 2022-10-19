import React, { CSSProperties } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "components/common/Button";
import { theme } from "styles/theme";
import { ReactComponent as TaxiLogo } from "static/assets/TaxiLogo.svg";

const Error = () => {
  // const { error } = useParams<ErrorParams>();
  const history = useHistory();

  // FIXME Global State 에서 오류 가져오기
  // const errorPrimaryState = error ? error : "404";
  const stylePage: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
  };
  const styleLogo = { height: 54, marginBottom: 16 };
  const styleTitle = { ...theme.font20, marginBottom: 12 };
  const styleMessage = {
    ...theme.font12,
    color: theme.gray_text,
    marginBottom: 24,
  };

  return (
    <div style={stylePage}>
      <TaxiLogo style={styleLogo} />
      <div style={styleTitle}>예상치 못한 오류가 발생하였습니다</div>
      {/* // FIXME 에러 메세지 만들기 */}
      <div style={styleMessage}>아래 버튼을 클릭해주세요</div>
      <div style={{ display: "flex", columnGap: "12px" }}>
        <Button
          type="white"
          padding="13px 24px 14px"
          radius={12}
          font={theme.font14}
          onClick={() => history.goBack()}
        >
          이전 페이지
        </Button>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            type="purple"
            padding="13px 24px 14px"
            radius={12}
            font={theme.font14_bold}
          >
            홈으로 가기
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
