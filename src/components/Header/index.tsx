import { HTMLProps, ReactNode, memo, useEffect, useRef, useState } from "react";

import theme from "tools/theme";

type HeaderProps = {
  children?: ReactNode;
} & HTMLProps<HTMLDivElement>;

const Header = ({ children, ...divProps }: HeaderProps) => {
  const navRef = useRef<HTMLDivElement>(null);
  const padRef = useRef<HTMLDivElement>(null);
  const [padHeight, setPadHeight] = useState<number>(0);

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
    height: "40px",
    zIndex: theme.zIndex_nav,
    overflow: "hidden",
    background: theme.white,
    boxShadow: theme.shadow_3,
    padding: "calc(max(5px, env(safe-area-inset-top)) + 12px) 0 12px",
    display: "flex",
    gap: "16px",
    alignItems: "center",
  };

  return (
    <>
      <div ref={navRef} css={style} {...divProps}>
        {children}
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

export default memo(Header);
