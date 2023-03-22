import { ReactNode } from "react";
import theme from "tools/theme";
import NotInterestedIcon from "@material-ui/icons/NotInterested";

type ScreenType = "mobile" | "pc";

type EmptyProps = { screen: ScreenType; children: ReactNode };

const Empty = ({ screen, children }: EmptyProps) => {
  const styleCommon: CSS = {
    display: "flex",
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
      <NotInterestedIcon style={{ fontSize: "16px" }} />
      {children}
    </div>
  );
};

export default Empty;
