import theme from "tools/theme";

import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

const ScrollUpButton = () => (
  <div
    css={{
      position: "fixed",
      bottom: 72,
      right: 16,
      zIndex: theme.zIndex_nav,
      height: 48,
      width: 48,
      borderRadius: "50%",
      backgroundColor: theme.white,
      boxShadow: theme.shadow_clicked,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      ...theme.cursor(),
    }}
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  >
    <ArrowUpwardRoundedIcon style={{ color: theme.purple, fontSize: 28 }} />
  </div>
);

export default ScrollUpButton;
