import AdaptiveDiv from "@/components/AdaptiveDiv";
import Title from "@/components/Title";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

type RacingGameProps = {
  roomId: string;
  chats: any[];
  sendMessage: (type: any, content: any) => Promise<boolean>;
};

const RacingGame = (_: RacingGameProps) => {
  return (
    <AdaptiveDiv type="center">
      <Title isHeader>경마 (준비 중)</Title>
      <WhiteContainer
        css={{
          padding: "24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
          ...theme.font16_bold,
          color: theme.gray_text,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div>🚧 준비 중입니다 🚧</div>
          <div
            style={{ ...theme.font14, marginTop: "8px", fontWeight: "normal" }}
          >
            아직 두 번째 게임은 만들어지지 않았습니다.
          </div>
        </div>
      </WhiteContainer>
    </AdaptiveDiv>
  );
};

export default RacingGame;
