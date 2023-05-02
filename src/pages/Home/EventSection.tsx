import { Link } from "react-router-dom";

import Button from "components/Button";
import RLayout from "components/RLayout";
import Title from "components/Title";
import WhiteContainer from "components/WhiteContainer";

import theme from "tools/theme";

const EventSection = () => {
  return (
    <RLayout.R1>
      <Title icon="event" header>
        이벤트
      </Title>
      <WhiteContainer>
        <div
          css={{
            ...theme.font14,
            color: theme.black,
            margin: "0px 4px 15px",
          }}
        >
          <div
            css={{
              ...theme.font16_bold,
              marginBottom: "10px",
            }}
          >
            2023 택시 이벤트
          </div>
          <div
            css={{
              ...theme.font14,
              display: "flex",
              gap: "10px",
              alignItems: "center",
              lineHeight: "1.2rem",
            }}
          >
            택시 이벤트에 참여하고 에어팟 3세대, 갤럭시 워치5 등 수많은 상품을
            받아가세요!
          </div>
        </div>
        <Link to="/event/2023spring" style={{ textDecoration: "none" }}>
          <Button
            type="purple"
            padding="14px 0 13px"
            radius={12}
            font={theme.font16_bold}
          >
            이벤트 확인하기
          </Button>
        </Link>
      </WhiteContainer>
    </RLayout.R1>
  );
};

export default EventSection;
