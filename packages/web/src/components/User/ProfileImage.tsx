import { useEffect, useState } from "react";

import theme from "@/tools/theme";

import defaultImg from "@/static/assets/profileImgOnError.png";
import withdrawImg from "@/static/assets/profileImgWithdraw.png";

type ProfileImageProps = {
  url: string;
  withdraw?: boolean; // 탈퇴한 회원 -> 유령 이미지
};

const ProfileImage = ({ url, withdraw = false }: ProfileImageProps) => {
  const [src, setSrc] = useState(withdraw ? withdrawImg : url);

  useEffect(() => {
    setSrc(withdraw ? withdrawImg : url);
  }, [url]);

  return (
    <div
      css={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: theme.gray_background,
      }}
    >
      <img
        src={src}
        css={{
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        alt={`/profile-img/${withdraw ? "withdrawImg" : url}`}
        onError={() => setSrc(defaultImg)}
      />
    </div>
  );
};

export default ProfileImage;
