import { memo } from "react";
import { Link } from "react-router-dom";

import theme from "tools/theme";

import { ReactComponent as SparcsLogo } from "static/assets/SparcsLogoWithText.svg";

type BtnFooterProps = {
  text: string;
};

const BtnFooter = ({ text }: BtnFooterProps) => {
  return (
    <div css={{ ...theme.font12, padding: "6px" }}>
      <Link
        to="/home/privacyPolicy"
        style={{ textDecoration: "none", color: theme.gray_text }}
      >
        {text}
      </Link>
    </div>
  );
};

const Footer = () => (
  <div
    css={{
      paddingTop: "45px",
      textAlign: "center",
    }}
  >
    {/* <BtnFooter text="채널톡 문의하기" /> */}
    <BtnFooter text="개인정보 처리방침" />
    {/* <BtnFooter text="만든 사람들" /> */}
    <div css={{ padding: "6px" }}>
      <a href="https://sparcs.org/" target="_blank" rel="noreferrer">
        <SparcsLogo style={{ height: "27px", opacity: 0.632 }} />
      </a>
    </div>
  </div>
);

export default memo(Footer);
