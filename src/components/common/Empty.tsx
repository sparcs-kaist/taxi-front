import React, { CSSProperties } from "react";
import { theme } from "styles/theme";
import NotInterestedIcon from "@material-ui/icons/NotInterested";

type ScreenType = "mobile" | "pc";

type EmptyProps = { screen: ScreenType; children: React.ReactNode };

const Empty = ({ screen, children }: EmptyProps) => {
  const styleMobile: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...theme.font14_bold,
    color: theme.gray_text,
    padding: "24px 0",
    columnGap: "6px",
    borderRadius: "12px",
    backgroundColor: theme.gray_background,
    border: "0.25px solid " + theme.gray_line,
  };
  const stylePC: CSSProperties = {};
  return screen === "mobile" ? (
    <div style={styleMobile}>
      <NotInterestedIcon style={theme.font15_icon} />
      {children}
    </div>
  ) : (
    <div style={stylePC}></div>
  );
};

export default Empty;
