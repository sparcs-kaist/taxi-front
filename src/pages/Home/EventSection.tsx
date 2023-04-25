import { Link } from "react-router-dom";

import Button from "components/Button";
import RLayout from "components/RLayout";
import Title from "components/Title";
import WhiteContainer from "components/WhiteContainer";

import theme from "tools/theme";

const EventSection = () => {
  return (
    <RLayout.R1>
      <Title icon="taxi" header>
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
          이벤트 설명 어쩌구 저쩌구
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
