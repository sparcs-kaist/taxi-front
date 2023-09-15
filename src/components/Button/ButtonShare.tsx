import theme from "tools/theme";

type ButtonShareProps = {
  text: string;
  icon: React.ReactNode;
  background: string;
  onClick?: () => void;
};

const ButtonShare = ({ text, icon, background, onClick }: ButtonShareProps) => (
  <div
    css={{
      width: "45px",
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    <div
      css={{
        width: "45px",
        height: "45px",
        borderRadius: "6px",
        backgroundColor: background,
        boxShadow: theme.shadow_gray_button_inset,
        color: theme.gray_text,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </div>
    <div
      css={{
        ...theme.font10,
        color: theme.gray_text,
        textAlign: "center",
        paddingTop: "4px",
      }}
    >
      {text}
    </div>
  </div>
);

export default ButtonShare;
