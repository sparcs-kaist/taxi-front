import theme from "@/tools/theme";

type HeaderBarProps = {
  position?: "fixed" | "absolute";
};

const HeaderBar = ({ position = "fixed" }: HeaderBarProps) => (
  <div
    style={{
      background: theme.purple,
      width: "100%",
      height: "max(5px, env(safe-area-inset-top))",
      position,
      top: "0px",
      left: "0px",
      zIndex: theme.zIndex_headerBar,
    }}
  />
);

export default HeaderBar;
