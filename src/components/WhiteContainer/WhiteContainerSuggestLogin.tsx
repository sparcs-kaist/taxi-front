import Button from "@/components/Button";
import LinkLogin from "@/components/Link/LinkLogin";
import theme from "@/tools/theme";

import WhiteContainer from ".";

const WhiteContainerSuggestLogin = () => (
  <WhiteContainer>
    <div
      css={{
        ...theme.font14,
        marginBottom: 12,
      }}
    >
      로그인이 필요한 서비스입니다
    </div>
    <LinkLogin>
      <Button
        type="purple"
        css={{
          padding: "14px 0 13px",
          borderRadius: "12px",
          ...theme.font16_bold,
        }}
      >
        로그인
      </Button>
    </LinkLogin>
  </WhiteContainer>
);

export default WhiteContainerSuggestLogin;
