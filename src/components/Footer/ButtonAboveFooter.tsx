import theme from "tools/theme";

type ButtonAboveFooterProps = {
  text: string;
  onClick?: () => void;
};

const ButtonAboveFooter = ({ text, onClick }: ButtonAboveFooterProps) => (
  <div css={{ ...theme.font12, padding: "6px" }}>
    <a
      onClick={onClick}
      style={{
        textDecoration: "none",
        color: theme.gray_text,
        ...theme.cursor(),
      }}
    >
      {text}
    </a>
  </div>
);

export default ButtonAboveFooter;
