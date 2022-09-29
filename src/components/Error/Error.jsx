import React from "react";
import Title from "components/common/Title";
import Spacer from "components/common/utils/Spacer";
import Button from "components/common/Button";
import { theme } from "styles/theme";
import { useParams, Link, useHistory } from "react-router-dom";
import RLayout from "components/common/RLayout";

const Error = () => {
  const { error } = useParams();
  const history = useHistory();

  // FIXME Global State 에서 오류 가져오기
  const errorPrimaryState = error ? error : "404";
  const errorSecondaryState = "예상치 못한 오류가 발생하였습니다";

  const onClickGoBack = () => {
    history.goBack();
  };

  return (
    <RLayout.R1>
      <Title icon="error" header={true} marginAuto={false}>
        오류가 발생하였습니다
      </Title>
      <div id="error-body">
        <Spacer height={80} />
        <h1
          style={{
            fontSize: "60px",
            fontWeight: "bold",
            textAlign: "center",
            color: "#6E3678",
          }}
        >
          {errorPrimaryState}
        </h1>
        <Spacer height={15} />
        <p
          style={{
            fontSize: "16px",
            textAlign: "center",
            color: "#888888",
          }}
        >
          {errorSecondaryState}
        </p>
      </div>
      <Spacer height={110} />
      <Button
        type="white"
        padding="13px 24px 14px"
        radius={12}
        font={theme.font14}
        onClick={onClickGoBack}
      >
        이전 페이지
      </Button>
      <Spacer height={12} />
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
    </RLayout.R1>
  );
};

export default Error;
