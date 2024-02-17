import theme from "@/tools/theme";

type ButtonAboveFooterProps = {
  text: string;
  onClick?: () => void;
  isWhite?: boolean;
};

const ButtonAboveFooter = ({
  text,
  onClick,
  isWhite = false,
}: ButtonAboveFooterProps) => (
  <div css={{ ...theme.font12, padding: "6px" }}>
    <a
      onClick={onClick}
      style={{
        textDecoration: "none",
        color: isWhite ? theme.white : theme.gray_text,
        ...theme.cursor(),
      }}
    >
      {text}
    </a>
  </div>
);

export default ButtonAboveFooter;
