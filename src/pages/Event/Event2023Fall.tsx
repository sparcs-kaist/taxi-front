import { memo } from "react";

import AdaptiveDiv from "components/AdaptiveDiv";
import HeaderWithBackButton from "components/Header/HeaderWithBackButton";
import Title from "components/Title";

import theme from "tools/theme";

const Event2023Fall = () => {
  return (
    <>
      <HeaderWithBackButton>
        <div css={{ color: theme.purple, ...theme.font18 }}>이벤트 안내</div>
      </HeaderWithBackButton>
      <AdaptiveDiv type="center">
        <Title icon="notice" isHeader>
          2023Fall 이벤트 - TODO
        </Title>
      </AdaptiveDiv>
    </>
  );
};

export default memo(Event2023Fall);
