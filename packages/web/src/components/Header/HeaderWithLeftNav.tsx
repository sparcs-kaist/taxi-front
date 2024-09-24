import { ReactNode, memo } from "react";
import { Link } from "react-router-dom";

import HeaderWithBackButton from "./HeaderWithBackButton";

import theme from "@/tools/theme";

type ButtonNavProps = {
  selected?: boolean;
  children?: ReactNode;
};

const ButtonNav = ({ selected, children }: ButtonNavProps) => (
  <div css={{ position: "relative" }}>
    <div
      css={{
        ...theme.font16_bold,
        color: selected ? theme.purple : theme.purple_disabled,
      }}
    >
      {children}
    </div>
    <div
      css={{
        position: "absolute",
        bottom: "-6px",
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        css={{
          height: "2px",
          width: "16px",
          background: theme.purple,
          opacity: selected ? 1 : 0,
          borderRadius: "1px",
        }}
      />
    </div>
  </div>
);

type HeaderWithLeftNavProps = {
  value?: string;
  options?: Array<{ value: string; label: string; to: string }>;
};

const HeaderWithLeftNav = ({ value, options = [] }: HeaderWithLeftNavProps) => (
  <HeaderWithBackButton>
    <div css={{ display: "flex", gap: "16px" }}>
      <div css={{ flexGrow: 1 }} />
      {options.map(({ value: _value, label, to }) => (
        <Link key={label} to={to} css={{ textDecoration: "none" }}>
          <ButtonNav key={label} selected={_value === value}>
            {label}
          </ButtonNav>
        </Link>
      ))}
    </div>
  </HeaderWithBackButton>
);

export default memo(HeaderWithLeftNav);
