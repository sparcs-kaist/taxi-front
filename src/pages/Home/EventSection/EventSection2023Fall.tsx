import AdaptiveDiv from "components/AdaptiveDiv";
import Title from "components/Title";
import WhiteContainer from "components/WhiteContainer";

import theme from "tools/theme";

const EventSection2023Fall = () => {
  return (
    <AdaptiveDiv type="center">
      <Title icon="notice" isHeader>
        추석 이벤트
      </Title>
      <WhiteContainer css={{ background: theme.purple }}></WhiteContainer>
    </AdaptiveDiv>
  );
};

export default EventSection2023Fall;
