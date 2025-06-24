import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import theme from "@/tools/theme";

import { ReactComponent as BadgeIcon } from "@/static/assets/phone_badge_img.svg";
import Tooltip from "@mui/material/Tooltip";

type BadgeImageProps = {
  badge_live?: boolean;
};

const BadgeImage = ({ badge_live }: BadgeImageProps) => {
  const loginInfo = useValueRecoilState("loginInfo");

  if (badge_live === undefined && !(loginInfo?.badge || false)) return null;
  if (badge_live === false) return null;

  return (
    <div
      css={{
        position: "relative",
        display: "inline-block",
        width: "1em",
        height: "1em",
        marginLeft: "0.25em",
        verticalAlign: "middle",
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
              pointerEvents: "auto", // 반드시 필요
            }}
          />
        </div>
      </Tooltip>
    </div>
  );
};

export default BadgeImage;
