import { EventItemProps } from "components/Event/EventItem";

import theme from "tools/theme";

import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

export type BodyEventItemProps = {
  itemInfo: EventItemProps;
  height?: number;
};

const BodyEventItem = ({ itemInfo, height }: BodyEventItemProps) => {
  const styleWrapper = height
    ? {
        height,
        display: "flex",
        flexDirection: "column" as any,
      }
    : {};

  const styleButtonSection = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    margin: "12px 0px 0",
  };

  const styleIcon = {
    width: "16px",
    height: "16px",
    fill: theme.gray_text,
  };

  const styleInfo = {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "12px",
  };

  return (
    <div css={styleWrapper}>
      <div css={styleInfo}>
        <LocationOnRoundedIcon style={styleIcon} />
        <div css={{ color: theme.gray_text, ...theme.font14_bold }}>
          {itemInfo.name}
        </div>
      </div>
      <div css={{ flexGrow: 1 }} />
      <div css={styleButtonSection}></div>
    </div>
  );
};

export default BodyEventItem;
