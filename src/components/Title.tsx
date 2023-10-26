import theme from "@/tools/theme";
import { ReactNode, memo } from "react";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import FavoriteRoundedIocn from "@mui/icons-material/FavoriteRounded";
import FeedRounedIcon from "@mui/icons-material/FeedRounded";
import FestivalRoundedIcon from "@mui/icons-material/FestivalRounded";
import HailRoundedIcon from "@mui/icons-material/HailRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import LocalTaxiRoundedIcon from "@mui/icons-material/LocalTaxiRounded";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";

type IconProps = {
  type?:
    | "taxi"
    | "search"
    | "search_result"
    | "add"
    | "myroom"
    | "current"
    | "past"
    | "chat"
    | "mypage"
    | "error"
    | "feed"
    | "favorite"
    | "notice"
    | "ticket"
    | "festival"
    | "shop"
    | "leaderboard";
};

type TitleProps = {
  icon?: IconProps["type"];
  children: ReactNode;
  isHeader?: boolean;
};

const Icon = ({ type: icon }: IconProps) => {
  const iconStyle = {
    width: "24px",
    height: "24px",
    fill: theme.purple,
  };

  switch (icon) {
    case "taxi":
      return <LocalTaxiRoundedIcon style={iconStyle} />;
    case "search":
      return <SearchRoundedIcon style={iconStyle} />;
    case "search_result":
      return <ManageSearchRoundedIcon style={iconStyle} />;
    case "add":
      return <AddRoundedIcon style={iconStyle} />;
    case "myroom":
      return <SubjectRoundedIcon style={iconStyle} />;
    case "current":
      return <HailRoundedIcon style={{ ...iconStyle, marginRight: "-3px" }} />;
    case "past":
      return <HistoryRoundedIcon style={iconStyle} />;
    case "chat":
      return <QuestionAnswerRoundedIcon style={iconStyle} />;
    case "mypage":
      return <PersonOutlineRoundedIcon style={iconStyle} />;
    case "error":
      return <ErrorOutlineRoundedIcon style={iconStyle} />;
    case "feed":
      return <FeedRounedIcon style={iconStyle} />;
    case "favorite":
      return <FavoriteRoundedIocn style={iconStyle} />;
    case "notice":
      return <NotificationsActiveRoundedIcon style={iconStyle} />;
    case "ticket":
      return <ConfirmationNumberRoundedIcon style={iconStyle} />;
    case "festival":
      return <FestivalRoundedIcon style={iconStyle} />;
    case "shop":
      return <ShoppingCartRoundedIcon style={iconStyle} />;
    case "leaderboard":
      return <EmojiEventsRoundedIcon style={iconStyle} />;
    default:
      return <></>;
  }
};

const Title = ({ icon, children, isHeader = false }: TitleProps) => (
  <div
    css={{
      display: "flex",
      alignItems: "flex-end",
      padding: isHeader ? "30px 0 25px" : undefined,
    }}
  >
    {icon && <Icon type={icon} />}
    <div
      css={{
        ...theme.font20,
        color: theme.purple,
        marginLeft: icon ? "8px" : undefined,
      }}
    >
      {children}
    </div>
  </div>
);

export default memo(Title);
