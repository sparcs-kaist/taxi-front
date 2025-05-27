import { css } from "@emotion/react";

import Button from "@/components/Button";

import theme from "@/tools/theme";

import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import NotificationsIcon from "@mui/icons-material/Notifications";

type NoticeItemProps = {
  is_pinned: boolean;
  title: string;
  onClickHandler: () => void;
};

const shadowStyles = css({
  display: "flex",
  position: "relative",
  padding: "13px 20px",
  borderRadius: "12px",
  background: theme.white,
  "&:hover": {
    background: theme.gray_background,
    borderBottom: `0.5px solid ${theme.purple}`,
  },
  cursor: "pointer",
  boxShadow: theme.shadow,
  transition: "box-shadow 0.2s ease, background 0.2s ease",

  "&::after": {
    position: "absolute",
    width: "100%",
    height: "100%",
    content: '""',
    top: 0,
    left: 0,
    zIndex: -1,
    borderRadius: "12px",
    boxShadow: `
      0px 2px 4px rgba(110, 54, 120, 0.2),
      0px 1px 18px rgba(110, 54, 120, 0.12),
      0px 6px 10px rgba(110, 54, 120, 0.14)
    `,
    opacity: 0,
    transition: "opacity 150ms ease-in-out",
  },

  "&:hover::after, &:active::after": {
    opacity: 1,
  },
});

const NoticeItem = ({ is_pinned, title, onClickHandler }: NoticeItemProps) => {
  const styleButton = {
    whiteSpace: "nowrap",
    alignItems: "center",
    display: "flex",
    gap: "8px",
    background: "transparent",
    border: "none",
    marginTop: "0",
    padding: "0",
  };

  return (
    <div css={shadowStyles} onClick={onClickHandler}>
      <Button css={styleButton}>
        {is_pinned ? <NotificationImportantIcon /> : <NotificationsIcon />}
        {title}
      </Button>
    </div>
  );
};

export default NoticeItem;
