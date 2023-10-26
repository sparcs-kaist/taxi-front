import alertAtom from "@/atoms/alert";
import useSendMessage from "@/hooks/chat/useSendMessage";
import { convertImage, getImageSrc } from "@/tools/image";
import theme from "@/tools/theme";
import { useCallback, useEffect, useState } from "react";

import ButtonSend from "./ButtonSend";

import { useSetRecoilState } from "recoil";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MotionPhotosOnIcon from "@mui/icons-material/RotateLeftRounded";

type BodyImageProps = {
  uploadedImage: File;
  onChangeUploadedImage?: (file: Nullable<File>) => void;
  sendMessage: ReturnType<typeof useSendMessage>;
};

const BodyImage = ({
  uploadedImage,
  onChangeUploadedImage,
  sendMessage,
}: BodyImageProps) => {
  const setAlert = useSetRecoilState(alertAtom);
  const [convertedImage, setConvertedImage] = useState<Nullable<File>>(null); // 압축된 업로드된 이미지 파일
  const [convertedImageSrc, setConvertedImageSrc] =
    useState<Nullable<string>>(null); // 압축된 업로드된 이미지 파일
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);

  const isMessageValid: boolean = !!convertedImage && !!convertedImageSrc;

  const onSend = async () => {
    if (isMessageValid) {
      setIsSendingMessage(true);
      const result = await sendMessage("image", {
        file: convertedImage as File,
      });
      if (result) onChangeUploadedImage?.(null);
      setIsSendingMessage(false);
    }
  };
  const onClickClose = useCallback(() => {
    onChangeUploadedImage?.(null);
  }, [onChangeUploadedImage]);
  const onError = useCallback(() => {
    setAlert("이미지 업로드에 실패하였습니다.");
    onChangeUploadedImage?.(null);
  }, [onChangeUploadedImage]);

  useEffect(() => {
    const convert = async () => {
      if (!uploadedImage) return setConvertedImage(null);
      const _convertedImage = await convertImage(uploadedImage);
      if (!_convertedImage) {
        setAlert("이미지 업로드에 실패하였습니다.");
        onChangeUploadedImage?.(null);
      } else setConvertedImage(_convertedImage);
    };
    convert();
  }, [uploadedImage]);

  useEffect(() => {
    const getSrc = async () => {
      if (!convertedImage) return setConvertedImageSrc(null);
      const _convertedImageSrc = await getImageSrc(convertedImage);
      if (!_convertedImageSrc) {
        setAlert("이미지 업로드에 실패하였습니다.");
        onChangeUploadedImage?.(null);
      } else setConvertedImageSrc(_convertedImageSrc);
    };
    getSrc();
  }, [convertedImage]);

  return (
    <>
      <div
        css={{
          width: "min(calc(100% - 40px), 96px)",
          aspectRatio: "1 / 1",
          margin: "6px",
          position: "relative",
          boxShadow: theme.shadow,
          boxSizing: "border-box",
          borderRadius: "12px",
          background: theme.white,
          overflow: "hidden",
        }}
      >
        {convertedImageSrc ? (
          <img
            src={convertedImageSrc}
            css={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onError={onError}
          />
        ) : (
          <div
            css={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MotionPhotosOnIcon
              className="MessageForm_rotate_infinite"
              css={{
                fill: theme.gray_text,
                fontSize: "22px",
              }}
            />
          </div>
        )}
        <div
          css={{
            position: "absolute",
            right: "4px",
            top: "4px",
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background: theme.gray_background,
            ...theme.cursor(),
          }}
          onClick={onClickClose}
        >
          <CloseRoundedIcon
            style={{ width: "12px", height: "12px", margin: "3px" }}
          />
        </div>
      </div>
      <ButtonSend
        onClick={onSend}
        status={
          isSendingMessage ? "pending" : isMessageValid ? "active" : "inactive"
        }
      />
    </>
  );
};

export default BodyImage;
