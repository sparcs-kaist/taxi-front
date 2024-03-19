import theme from "@/tools/theme";

import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";

type newMessageProps = {
  isDisplay: boolean;
  onClick: () => void;
};

const NewMessage = ({ isDisplay, onClick }: newMessageProps) => (
  <div
    css={{
      position: "absolute" as any,
      left: "50%",
      bottom: "0",
      transform: `translate(-50%, ${
        isDisplay ? "-12px" : "calc(100% + 20px)"
      })`,
      transition: "all 0.3s",
      background: theme.white,
      boxShadow: theme.shadow_clicked,
      padding: "6px 10px 5px 8px",
      borderRadius: "13px",
      border: `0.5px solid ${theme.purple}`,
      color: theme.purple,
      ...theme.font12,
      display: "flex",
      columnGap: "4px",
      ...theme.cursor(),
    }}
    onClick={onClick}
  >
    <ArrowDownwardRoundedIcon style={{ fontSize: "11px", marginTop: "1px" }} />
    새로운 메시지
  </div>
);

export default NewMessage;
