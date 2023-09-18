import { useCallback, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import Button from "components/Button";
import LinkLogin from "components/Link/LinkLogin";

import loginInfoAtom from "atoms/loginInfo";
import { useRecoilValue } from "recoil";

import theme from "tools/theme";

import { ReactComponent as TaxiLogo } from "static/assets/sparcsLogos/TaxiLogo.svg";

const Login = () => {
  const history = useHistory();
  const { search } = useLocation();
  const { id: userId } = useRecoilValue(loginInfoAtom);

  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const redirectPath = searchParams.get("redirect");

    // 이미 로그인 되어 있는 경우, 홈페이지로 이동합니다.
    if (userId) history.replace(redirectPath || "/");
  }, [userId, search]);

  const onClickBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const style = {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
  };
  const styleLogo = { height: 54, marginBottom: 16 };
  const styleTitle = { ...theme.font20, marginBottom: 12 };
  const styleMessage = {
    ...theme.font12,
    color: theme.gray_text,
    marginBottom: 24,
  };

  return (
    <div css={style}>
      <TaxiLogo style={styleLogo} />
      <div style={styleTitle}>로그인 후 이용 가능한 서비스입니다.</div>
      <div style={styleMessage}>
        세션 만료로 로그아웃이 되었거나, 잘못된 페이지 접근입니다.
        <br />
        로그인 이후 다시 시도해주세요.
      </div>
      <div style={{ display: "flex", columnGap: "12px" }}>
        <Button
          type="white"
          css={{
            padding: "13px 24px 14px",
            borderRadius: "12px",
            ...theme.font14,
          }}
          onClick={onClickBack}
        >
          이전 페이지
        </Button>
        <LinkLogin
          redirect={new URLSearchParams(search).get("redirect") || "/"}
        >
          <Button
            type="purple"
            css={{
              padding: "13px 24px 14px",
              borderRadius: "12px",
              ...theme.font14_bold,
            }}
          >
            로그인
          </Button>
        </LinkLogin>
      </div>
    </div>
  );
};

export default Login;
