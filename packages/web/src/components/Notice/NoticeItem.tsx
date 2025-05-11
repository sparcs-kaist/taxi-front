import Button from "@/components/Button";

import theme from "@/tools/theme";

import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import NotificationsIcon from "@mui/icons-material/Notifications";

type NoticeItemProps = {
  is_pinned: boolean;
  title: string;
  onClickHandler: () => void;
};

const NoticeItem = ({ is_pinned, title, onClickHandler }: NoticeItemProps) => {
  const styleBox = {
    padding: "24px 0",
    border: "0.25px solid " + theme.gray_line,
    borderRadius: "8px",
  };

  return (
    <div style={styleBox}>
      <Button
        onClick={onClickHandler}
        style={{
          whiteSpace: "nowrap",
          alignItems: "center",
          display: "flex",
          gap: "8px",
          marginTop: "0",
        }}
      >
        {is_pinned ? <NotificationImportantIcon /> : <NotificationsIcon />}
        {title}
      </Button>
    </div>
  );
};

export default NoticeItem;
