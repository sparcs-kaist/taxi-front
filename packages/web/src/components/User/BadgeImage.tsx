import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import theme from "@/tools/theme";

import { ReactComponent as GoldBadgeIcon } from "@/static/assets/phone_badge_gold.svg";
import { ReactComponent as NormalBadgeIcon } from "@/static/assets/phone_badge_normal.svg";
import { ReactComponent as SilverBadgeIcon } from "@/static/assets/phone_badge_silver.svg";
import Tooltip from "@mui/material/Tooltip";

type BadgeImageProps = {
  badge_live?: boolean;
  badge_size?: string;
};

const BadgeImage = ({ badge_live, badge_size = "1em" }: BadgeImageProps) => {
  const loginInfo = useValueRecoilState("loginInfo");
  const displayTier = loginInfo?.badge === "none" ? "normal" : loginInfo?.badge;

  // 티어에 따라 아이콘 및 스케일 선택
  let BadgeIcon;
  let scale = 1;

  if (displayTier === "gold") {
    BadgeIcon = GoldBadgeIcon;
    scale = 1.15;
  } else if (displayTier === "silver") {
    BadgeIcon = SilverBadgeIcon;
    scale = 1.23;
  } else if (displayTier === "normal") {
    BadgeIcon = NormalBadgeIcon;
    scale = 1;
  } else {
    return null; // 배지가 없으면 아무것도 렌더링하지 않음
  }

  return (
    <div
      css={{
        position: "relative",
        display: "inline-block",
        width: badge_size,
        height: badge_size,
        marginLeft: "0.25em",
        verticalAlign: "middle",
        lineHeight: 0,
        overflow: "visible",
      }}
    >
      <Tooltip
        title="이 배지가 있는 회원분들은 문제가 생길 시 스팍스의 중계를 통해 문제를 해결할 수 있습니다."
        componentsProps={{
          tooltip: {
            sx: {
              ...theme.font12,
              color: theme.black,
              padding: "8px 10px 7px",
              marginTop: "8px !important",
              maxWidth: "280px",
              width: "calc(100vw - 40px)",
              boxShadow: theme.shadow,
              backgroundColor: theme.white,
              textAlign: "center",
              whiteSpace: "normal",
              borderRadius: "12px",
              cursor: "default",
            },
          },
        }}
        enterTouchDelay={0}
        leaveTouchDelay={2000}
      >
        <div style={{ width: "100%", height: "100%", pointerEvents: "auto" }}>
          <BadgeIcon
            css={{
              width: "100%",
              height: "100%",
              display: "block",
              pointerEvents: "auto",
              transform: `scale(${scale})`,
              transformOrigin: "center center",
            }}
          />
        </div>
      </Tooltip>
    </div>
  );
};

export default BadgeImage;
