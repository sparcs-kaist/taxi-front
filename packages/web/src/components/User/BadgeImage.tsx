
import Badge from "@/static/assets/profileImgWithPhonNumber.png"

type BadgeImageProps = {
  show?: boolean; // 탈퇴한 회원 -> 유령 이미지
};

const BadgeImage = ({ show = true }: BadgeImageProps) => {
  if (!show) return null;

  return (
    <div
      css={{
        display: "inline-block",
        width: "1em", // 현재 폰트 크기의 1배, 필요하면 0.8em 등으로 조절
        height: "1em",
        marginLeft: "0.25em",
        verticalAlign: "middle",
      }}
    >
      <img
        src={Badge}
        css={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
        alt="Badge-img"
      />
    </div>
  );
};

export default BadgeImage;
