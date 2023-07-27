import theme from "tools/theme";

import AddRoundedIcon from "@mui/icons-material/AddRounded";

type ToolSheetOpenButtonProps = {
  isOpen: boolean;
  onChangeIsOpen?: (x: boolean) => void;
};

const ToolSheetOpenButton = ({
  isOpen,
  onChangeIsOpen,
}: ToolSheetOpenButtonProps) => (
  <div css={{ marginBottom: "3px" }}>
    <AddRoundedIcon
      onClick={() => onChangeIsOpen && onChangeIsOpen(!isOpen)}
      css={{
        fill: theme.purple,
        width: "22px",
        height: "22px",
        transform: `rotate(${isOpen ? "45deg" : "0"})`,
        transition: "all 0.3s",
        ...theme.cursor(),
      }}
    />
  </div>
);

export default ToolSheetOpenButton;
