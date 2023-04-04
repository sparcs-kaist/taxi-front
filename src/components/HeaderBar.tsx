import theme from "tools/theme";

const HeaderBar = () => (
  <div
    style={{
      background: theme.purple,
      width: "100%",
      height: "max(5px, env(safe-area-inset-top))",
      position: "fixed",
      top: "0px",
      left: "0px",
      zIndex: theme.zIndex_headerBar,
    }}
  />
);

export default HeaderBar;
