import theme from "tools/theme";

import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";

type newMessageProps = {
  show: boolean;
  onClick: () => void;
};

const NewMessage = (props: newMessageProps) => {
  const style = {
    marginBottom: props.show ? "12px" : "-26px",
    opacity: props.show ? "1" : "0",
    padding: "6px 10px 5px 8px",
    borderRadius: "13px",
    background: theme.white,
    border: `0.5px solid ${theme.purple}`,
    boxShadow: theme.shadow_clicked,
    color: theme.purple,
    ...theme.font12,
    transition: "all 0.3s",
    columnGap: "4px",
    display: "flex",
    ...theme.cursor(),
  };
  return (
    <div style={style} onClick={props.onClick}>
      <ArrowDownwardRoundedIcon
        style={{ fontSize: "11px", marginTop: "1px" }}
      />
      새로운 메시지
    </div>
  );
};

export default NewMessage;
