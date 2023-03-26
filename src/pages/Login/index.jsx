import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import Button from "components/Button";
import HeaderBar from "components/HeaderBar";
import PopupPrivacyPolicy from "pages/Mypage/PopupPrivacyPolicy";

import loginInfoDetailAtom from "atoms/loginInfoDetail";
import { useRecoilValue } from "recoil";

import theme from "tools/theme";

import { backServer } from "loadenv";
import { ReactComponent as SparcsLogo } from "static/assets/SparcsLogoWithText.svg";
import { ReactComponent as TaxiLogo } from "static/assets/TaxiLogo.svg";

const Login = () => {
  const history = useHistory();
  const { pathname, search } = useLocation();
  const { id: userId } = useRecoilValue(loginInfoDetailAtom);
  const [isOpenPrivacyPolicy, setOpenPrivacyPolicy] = useState(
    pathname.includes("privacyPolicy")
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const redirectPath = searchParams.get("redirect");
    if (userId) history.replace(redirectPath || "/");
  }, [userId, search]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <PopupPrivacyPolicy
        isOpen={isOpenPrivacyPolicy}
        onClose={() => setOpenPrivacyPolicy(false)}
      />
      <HeaderBar />
      <TaxiLogo style={{ height: "54px", marginBottom: "10px" }} />
      <a
        href={`${backServer}/auth/sparcssso`}
        style={{ textDecoration: "none" }}
      >
        <Button
          type="purple"
          width="250px"
          padding="10px 0 11px"
          radius={12}
          font={theme.font16_bold}
        >
          로그인
        </Button>
      </a>
      <div
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          left: "12px",
          bottom: "max(16px, env(safe-area-inset-bottom))",
        }}
      >
        <a href="https://sparcs.netlify.app/" target="_blank" rel="noreferrer">
          <SparcsLogo style={{ height: "27px" }} />
        </a>
        <div
          style={{ ...theme.font12, cursor: "pointer" }}
          onClick={() => setOpenPrivacyPolicy(true)}
        >
          개인정보 처리방침
        </div>
      </div>
    </div>
  );
};

export default Login;
