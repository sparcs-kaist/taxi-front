import React from "react";
import { Link } from "react-router-dom";
import RLayout from "components/common/RLayout";
import Title from "components/common/Title";
import WhiteContainer from "components/common/WhiteContainer";
import Button from "components/common/Button";
import { theme } from "styles/theme";

const FullParticipation = () => {
  return (
    <RLayout.R1>
      <Title icon="add" header={true}>
        방 개설하기
      </Title>
      <WhiteContainer padding="12px 16px">
        <div style={theme.font16}>
          참여할 수 있는 방 개수는{" "}
          <b style={{ color: theme.purple }}>최대 5개</b>
          입니다.
        </div>
      </WhiteContainer>
      <WhiteContainer padding="12px 16px">
        <div style={{ ...theme.font16, lineHeight: "16px" }}>
          이미 5개의 방에 참여 중이며 <b>방 개설이 제한</b>됩니다. 추가적으로 방
          개설을 원하는 경우 참여 중인 방에서 <b>정산을 완료</b>하거나{" "}
          <b>탑승을 취소</b>해야 합니다.
        </div>
      </WhiteContainer>
      <Link to="/myroom" style={{ textDecoration: "none" }}>
        <Button
          type="purple"
          padding="13px 24px 14px"
          radius={12}
          font={theme.font14_bold}
        >
          참여 중인 방 보기
        </Button>
      </Link>
    </RLayout.R1>
  );
};

export default FullParticipation;
