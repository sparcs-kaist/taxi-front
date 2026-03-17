import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import theme from "@/tools/theme";

import { ReactComponent as GoldBadgeIcon } from "@/static/assets/phone_badge_gold.svg";
import { ReactComponent as NormalBadgeIcon } from "@/static/assets/phone_badge_normal.svg";
import { ReactComponent as PlatinumBadgeIcon } from "@/static/assets/phone_badge_platinum.svg";
import { ReactComponent as SilverBadgeIcon } from "@/static/assets/phone_badge_silver.svg";
import Tooltip from "@mui/material/Tooltip";

type BadgeImageProps = {
  badge_live?: boolean;
  badge_size?: string;
  tier?: "none" | "normal" | "silver" | "gold" | "platinum";
  noTooltip?: boolean;
  top?: string; // [추가] 밖에서 조정 가능
  marginRight?: string; // [추가] 밖에서 조정 가능
};

const BadgeImage = ({
  badge_live,
  badge_size = "1em",
  tier,
  noTooltip,
  top = "0", // [디폴트] 0
  marginRight = "0", // [디폴트] 0
}: BadgeImageProps) => {
  const loginInfo = useValueRecoilState("loginInfo");

  const rawBadge = tier || loginInfo?.badge;
  const displayTier = rawBadge;

  if (badge_live === false) return null;

  let BadgeIcon;
  let scale = 1;

  if (displayTier === "platinum") {
    BadgeIcon = PlatinumBadgeIcon;
    scale = 1.08;
  } else if (displayTier === "gold") {
    BadgeIcon = GoldBadgeIcon;
    scale = 1.08;
  } else if (displayTier === "silver") {
    BadgeIcon = SilverBadgeIcon;
    scale = 1.08;
  } else if (displayTier === "normal") {
    BadgeIcon = NormalBadgeIcon;
    scale = 1;
  } else {
    return null;
  }

  const iconJSX = (
    <div
      css={{
        position: "relative",
        display: "inline-block",
        width: badge_size,
        height: badge_size,
        marginLeft: "0.25em",
        marginRight: marginRight, // [적용]
        top: top, // [적용]
        verticalAlign: "middle",
        lineHeight: 0,
        overflow: "visible",
      }}
    >
      <div style={{ width: "100%", height: "100%", pointerEvents: "auto" }}>
        <BadgeIcon
          css={{
            width: "100%",
            height: "100%",
            display: "block",
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
        />
      </div>
    </div>
  );

  if (noTooltip) return iconJSX;

  return (
    <Tooltip
      title="이 배지가 있는 회원분들은 문제가 생길 시 스팍스의 중계를 통해 문제를 해결할 수 있습니다."
      enterTouchDelay={0}
      leaveTouchDelay={2000}
      componentsProps={{
        tooltip: {
          sx: {
            ...theme.font12,
            backgroundColor: theme.white,
            color: theme.black,
            boxShadow: theme.shadow,
            padding: "8px 10px",
            textAlign: "center",
            borderRadius: "12px",
          },
        },
      }}
    >
      {iconJSX}
    </Tooltip>
  );
};

export default BadgeImage;
