import { ReactComponent as BadgeIcon } from "@/static/assets/phone_badge_img.svg";
import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

type BadgeImageProps = {
  badge_live?: boolean;
};

const BadgeImage = ({ badge_live }: BadgeImageProps) => {
  const loginInfo = useValueRecoilState("loginInfo");

  // badge_live가 지정되지 않은 경우, loginInfo 체크
  if (badge_live === undefined && !loginInfo?.badge) return null;
  // badge_live가 false면 보여주지 않음
  if (badge_live === false) return null;

  return (
    <div
      css={{
        display: "inline-block",
        width: "1em", // 현재 폰트 크기의 1배
        height: "1em",
        marginLeft: "0.25em",
        verticalAlign: "middle",
      }}
    >
      <BadgeIcon
        css={{
          width: "100%",
          height: "100%",
          fill: "purple",
        }}
      />
    </div>
  );
};

export default BadgeImage;
