import theme from "styles/theme";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

const ScrollButton = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 72,
        right: 16,
        zIndex: theme.zIndex_modal,
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
};

export default ScrollButton;
