import { ReactNode, memo, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import AdaptiveDiv from "components/AdaptiveDiv";

import theme from "tools/theme";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

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

const HeaderWithLeftNav = ({ value, options = [] }: HeaderWithLeftNavProps) => {
  const navRef = useRef<HTMLDivElement>(null);
  const padRef = useRef<HTMLDivElement>(null);
  const [padHeight, setPadHeight] = useState<number>(0);
  const history = useHistory();

  useEffect(
    () =>
      setPadHeight(
        (navRef.current?.offsetHeight || 0) - (padRef.current?.offsetTop || 0)
      ),
    []
  );

  const style = {
    position: "fixed" as const,
    left: 0,
    top: 0,
    width: "100%",
    zIndex: theme.zIndex_nav,
    overflow: "hidden",
    background: theme.white,
    boxShadow: theme.shadow_3,
    padding: "calc(max(5px, env(safe-area-inset-top)) + 12px) 0 12px",
    display: "flex",
    gap: "16px",
    alignItems: "center",
  };
  const styleBody = {
    height: "40px",
    display: "flex",
    gap: "16px",
    alignItems: "center",
  };
  const styleIconLarge = {
    fill: theme.purple,
    ...theme.cursor(),
    width: "24px",
    height: "24px",
  };

  return (
    <>
      <div ref={navRef} css={style}>
        <AdaptiveDiv type="center" css={styleBody}>
          <ArrowBackRoundedIcon
            style={styleIconLarge}
            onClick={
              history.length <= 1
                ? () => history.replace("/myroom")
                : () => history.goBack()
            }
          />
          <div css={{ flexGrow: 1 }} />
          {options.map(({ value: _value, label, to }) => (
            <Link key={label} to={to} css={{ textDecoration: "none" }}>
              <ButtonNav key={label} selected={_value === value}>
                {label}
              </ButtonNav>
            </Link>
          ))}
        </AdaptiveDiv>
      </div>
      <div
        ref={padRef}
        css={{
          height: `${padHeight}px`,
        }}
      />
    </>
  );
};

export default memo(HeaderWithLeftNav);
