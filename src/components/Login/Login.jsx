import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { backServer } from "../../serverconf";
import RLayout from "../Frame/ReactiveLayout/RLayout";

import svgLogo from "../../images/sparcs_logo.svg";

const TaxiLogo = () => {
  const styleImg = {
    height: "70px",
    verticalAlign: "middle",
  };
  const styleTxt = {
    verticalAlign: "middle",
    marginLeft: "15px",
    fontSize: "50px",
    fontWeight: "900",
    color: "#623678",
  };
  return (
    <div style={{ position: "relative", height: "90px", textAlign: "center" }}>
      <img src={svgLogo} alt="" style={styleImg} />
      <span style={styleTxt}>Taxi</span>
    </div>
  );
};
const BtnLogin = () => {
  const [isHover, setHover] = useState(false);
  const style = {
    position: "absolute",
    top: "0px",
    left: "10%",
    right: "10%",
    height: "44px",
    borderRadius: "22px",
    lineHeight: "44px",
    textAlign: "center",
    fontSize: "17px",
    color: "#623678",
    border: "1px solid #623678",
  };
  const background = useSpring({
    background: `rgba(150,150,150,${isHover ? 0.1 : 0})`,
    config: { duration: 100 },
  });
  return (
    <div style={{ position: "relative" }}>
      <a href={`${backServer}/auth/sparcssso`}>
        <animated.div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{ ...style, ...background }}
        >
          로그인
        </animated.div>
      </a>
    </div>
  );
};

const Bottom = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "0px",
        left: "0px",
        width: "100%",
        height: "50px",
      }}
    >
      <RLayout.R1 height="100%">
        <div style={{ position: "absolute", top: "0px", right: "0px" }}>
          contact : taxi@sparcs.org
        </div>
      </RLayout.R1>
    </div>
  );
};

const Login = () => {
  return (
    <div className="ND" style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          background: "#663D71",
          width: "100%",
          height: "5px",
          position: "fixed",
          top: "0px",
          left: "0px",
        }}
      />
      <RLayout.R1 height="100%">
        <div style={{ height: "35%" }} />
        <TaxiLogo />
        <BtnLogin />
      </RLayout.R1>
      <Bottom />
    </div>
  );
};

export default Login;
