import React from "react";
import theme from "styles/theme";
import NotInterestedIcon from "@material-ui/icons/NotInterested";

type ScreenType = "mobile" | "pc";

type EmptyProps = { screen: ScreenType; children: React.ReactNode };

const Empty = ({ screen, children }: EmptyProps) => {
  const styleCommon: CSS = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...theme.font14_bold,
    color: theme.gray_text,
    columnGap: "6px",
  };
  const styleMobile: CSS = {
    ...styleCommon,
    padding: "24px 0",
    borderRadius: "12px",
    backgroundColor: theme.gray_background,
    border: "0.25px solid " + theme.gray_line,
  };
  const stylePC: CSS = {
    ...styleCommon,
    padding: "48px 0 26px",
  };

  return (
    <div style={screen === "pc" ? stylePC : styleMobile}>
      <NotInterestedIcon style={theme.font15_icon} />
      {children}
    </div>
  );
};

export default Empty;
