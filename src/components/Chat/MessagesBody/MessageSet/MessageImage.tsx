import { useState } from "react";

import useIsReadyToLoadImage from "hooks/chat/useIsReadyToLoadImage";

import { ModalFullImage } from "components/ModalPopup";

import alertAtom from "atoms/alert";
import { useSetRecoilState } from "recoil";

import theme from "tools/theme";
import { getS3Url } from "tools/trans";

import ImageNotSupportedRoundedIcon from "@mui/icons-material/ImageNotSupportedRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";

type MessageImageProps = {
  id: string;
  color: CSS["color"];
};

const MessageImage = ({ id, color }: MessageImageProps) => {
  const [isOpenFullImage, setIsOpenFullImage] = useState<boolean>(false);
  const setAlert = useSetRecoilState(alertAtom);

  const src = getS3Url(`/chat-img/${id}`);
  const [isReadyToLoadImage, isFailToLoadImage] = useIsReadyToLoadImage(src);

  return isReadyToLoadImage ? (
    <>
      <img
        src={src}
        className="MessageImage_img"
        loading="lazy"
        css={{
          maxWidth: "100%",
          maxHeight: "360px",
          verticalAlign: "middle",
          cursor: "pointer",
        }}
        onClick={() => {
          setIsOpenFullImage(true);
        }}
      />
      <ModalFullImage
        isOpen={isOpenFullImage}
        onChangeIsOpen={setIsOpenFullImage}
      />
    </>
  ) : (
    <div
      css={{
        width: "100%",
        padding: "7px 10px 6px",
        display: "flex",
        alignItems: "center",
        columnGap: "6px",
        ...theme.font14,
        color,
      }}
      onClick={
        isFailToLoadImage
          ? () => setAlert("이미지의 저장 기간이 만료되어 확인할 수 없습니다.")
          : undefined
      }
    >
      {isFailToLoadImage ? (
        <>
          <ImageNotSupportedRoundedIcon style={{ fontSize: "18px" }} />
          만료된 이미지
        </>
      ) : (
        <>
          <ImageRoundedIcon style={{ fontSize: "18px" }} />
          이미지 불러오는 중...
        </>
      )}
    </div>
  );
};

export default MessageImage;
