import { Link } from "react-router-dom";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import Title from "@/components/Title";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

const FullParticipation = () => {
  return (
    <AdaptiveDiv type="center">
      <Title icon="add" isHeader>
        방 개설하기
      </Title>
      <WhiteContainer css={{ padding: "12px 16px" }}>
        <div style={theme.font16}>
          참여할 수 있는 방 개수는{" "}
          <b style={{ color: theme.purple }}>최대 5개</b>
          입니다.
        </div>
      </WhiteContainer>
      <WhiteContainer css={{ padding: "12px 16px" }}>
        <div style={{ ...theme.font16, lineHeight: "24px" }}>
          이미 5개의 방에 참여 중이며 <b>방 개설이 제한</b>됩니다. 추가적으로 방
          개설을 원하는 경우 참여 중인 방에서 <b>정산을 완료</b>하거나{" "}
          <b>탑승을 취소</b>해야 합니다.
        </div>
      </WhiteContainer>
      <Link to="/myroom" style={{ textDecoration: "none" }}>
        <Button
          type="purple"
          css={{
            padding: "13px 24px 14px",
            borderRadius: "12px",
            ...theme.font14_bold,
          }}
        >
          참여 중인 방 보기
        </Button>
      </Link>
    </AdaptiveDiv>
  );
};

export default FullParticipation;
