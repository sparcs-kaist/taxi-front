import Button from "components/Button";
import HeaderBar from "components/HeaderBar";

import theme from "tools/theme";

import { backServer } from "loadenv";
import { ReactComponent as TaxiLogo } from "static/assets/TaxiLogo.svg";

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
    </div>
  );
};

export default Login;
