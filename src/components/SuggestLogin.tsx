import { useLocation } from "react-router-dom";

import LoginButton from "./LoginButton";

import theme from "tools/theme";

const SuggestLogin = () => {
  const { pathname, search } = useLocation();
  const currentPath = pathname + search;

  return (
    <div>
      <div
        style={{
          color: theme.black,
          ...theme.font14,
          marginBottom: 12,
        }}
      >
        로그인이 필요한 서비스입니다
      </div>
      <LoginButton
        type="purple"
        padding="14px 0 13px"
        radius={12}
        font={theme.font16_bold}
        isLogin={false}
        redirect={currentPath}
      >
        로그인
      </LoginButton>
    </div>
  );
};

export default SuggestLogin;
