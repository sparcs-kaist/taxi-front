import Button from "components/Button";
import LinkLogin from "components/Link/LinkLogin";

import theme from "tools/theme";

const SuggestLogin = () => (
  <>
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
        padding="14px 0 13px"
        radius={12}
        font={theme.font16_bold}
      >
        로그인
      </Button>
    </LinkLogin>
  </>
);

export default SuggestLogin;
