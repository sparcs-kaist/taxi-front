import React from "react";
import Title from "components/common/Title";
import Spacer from "components/common/utils/Spacer";
import SubmitButton from "components/common/roomOptions/SubmitButton";
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
      <Title icon="error" header={true}>
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
      <SubmitButton
        background="#EFEFEFAA"
        backgroundHover="#EFEFEF"
        textColor="#888888"
        disable={false}
        marginAuto={false}
        onClick={onClickGoBack}
      >
        이전 페이지로 돌아가기
      </SubmitButton>
      <Spacer height={12} />
      <Link to="/">
        <SubmitButton
          marginAuto={false}
          backgroundHover="#572A5E"
          disable={false}
        >
          Taxi 홈으로 돌아가기
        </SubmitButton>
      </Link>
    </RLayout.R1>
  );
};

export default Error;
