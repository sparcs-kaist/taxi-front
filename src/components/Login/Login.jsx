import React from "react";
import { backServer } from "serverconf";
import Button from "components/common/Button";
import { theme } from "styles/theme";
import { ReactComponent as TaxiLogo } from "static/assets/TaxiLogo.svg";
import HeaderBar from "components/common/HeaderBar";

const Login = () => {
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
      <HeaderBar />
      <TaxiLogo style={{ height: "54px", marginBottom: "10px" }} />
      <Button
        buttonType="purple"
        width="250px"
        padding="10px 0px 11px"
        radius={12}
        font={theme.font16_bold}
        href={`${backServer}/auth/sparcssso`}
      >
        로그인
      </Button>
    </div>
  );
};

export default Login;
