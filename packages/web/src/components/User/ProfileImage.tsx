import { useEffect, useState } from "react";

import theme from "@/tools/theme";

import defaultImg from "@/static/assets/profileImgOnError.png";

type ProfileImageProps = {
  url?: string;
};

const ProfileImage = ({ url }: ProfileImageProps) => {
  const [src, setSrc] = useState(url ? url : defaultImg);

  useEffect(() => {
    setSrc(url ? url : defaultImg);
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
        alt={`/profile-img/${url}`}
        onError={() => setSrc(defaultImg)}
      />
    </div>
  );
};

export default ProfileImage;
