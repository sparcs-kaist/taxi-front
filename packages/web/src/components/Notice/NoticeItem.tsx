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
    padding: "10px 0",
    border: "0.25px solid " + theme.black,
    borderRadius: "8px",
    "&:hover": {
      background: theme.gray_background,
    },
  };

  const styleButton = {
    whiteSpace: "nowrap",
    alignItems: "center",
    display: "flex",
    gap: "8px",
    marginTop: "0",
  };

  return (
    <div css={styleBox}>
      <Button onClick={onClickHandler} css={styleButton}>
        {is_pinned ? <NotificationImportantIcon /> : <NotificationsIcon />}
        {title}
      </Button>
    </div>
  );
};

export default NoticeItem;
