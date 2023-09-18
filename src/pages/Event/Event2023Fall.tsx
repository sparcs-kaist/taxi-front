import { memo } from "react";

import { sendPopupInstagramStoryShareToFlutter } from "hooks/skeleton/useFlutterEventCommunicationEffect";

import AdaptiveDiv from "components/AdaptiveDiv";
import HeaderWithBackButton from "components/Header/HeaderWithBackButton";
import Button from "components/Button";
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
        <Button
          type="purple"
          css={{
            padding: "14px 0 13px",
            borderRadius: "12px",
            ...theme.font16_bold,
          }}
          onClick={() =>
            sendPopupInstagramStoryShareToFlutter({
              backgroundLayerUrl:
                "https://sparcs-taxi-prod.s3.ap-northeast-2.amazonaws.com/assets/event-2023fall/instagram_background.png",
              stickerLayerUrl:
                "https://sparcs-taxi-prod.s3.ap-northeast-2.amazonaws.com/assets/event-2023fall/instagram_sticker.png",
            })
          }
        >
          인스타그램으로 공유하기 테스트
        </Button>
      </AdaptiveDiv>
    </>
  );
};

export default memo(Event2023Fall);
