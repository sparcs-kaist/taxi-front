import theme from "@/tools/theme";

type MiniCircleProps = {
  type: "from" | "to" | "date";
  isRequired?: boolean;
  isSelected?: boolean;
};

const MiniCircle = ({
  type,
  isRequired = false,
  isSelected = false,
}: MiniCircleProps) => {
  const style: CSS = {
    width: type === "date" ? "4px" : "5px",
    height: type === "date" ? "4px" : "5px",
    borderRadius: "50%",
    boxSizing: "border-box",
    backgroundColor:
      type === "from"
        ? undefined
        : isRequired
        ? theme.black
        : isSelected
        ? theme.white
        : type === "date"
        ? theme.purple_disabled
        : theme.gray_text,
    border: `1px solid ${
      isRequired ? theme.black : type === "from" ? theme.gray_text : undefined
    }`,
  };
  return <div style={style} />;
};

export default MiniCircle;
