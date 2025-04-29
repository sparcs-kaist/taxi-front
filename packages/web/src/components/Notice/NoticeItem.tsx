import Button from "@/components/Button";

import CampaignIcon from "@mui/icons-material/Campaign";
import NotificationsIcon from "@mui/icons-material/Notifications";

type NoticeItemProps = {
  is_active: boolean;
  is_pinned: boolean;
  title: string;
  onClickHandler: () => void;
};

const NoticeItem = ({
  is_active,
  is_pinned,
  title,
  onClickHandler,
}: NoticeItemProps) => {
  return (
    <div style={{ whiteSpace: "nowrap", display: "flex", gap: "8px" }}>
      {is_pinned ? <CampaignIcon /> : <NotificationsIcon />}
      <Button onClick={onClickHandler}>{title}</Button>
    </div>
  );
};

export default NoticeItem;
