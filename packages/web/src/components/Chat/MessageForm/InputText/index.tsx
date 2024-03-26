import { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Direction } from "react-toastify/dist/utils";

import useSendMessage from "@/hooks/chat/useSendMessage";

import BodyImage from "./BodyImage";
import BodyText from "./BodyText";

import theme from "@/tools/theme";

type InputTextProps = {
  uploadedImage?: Nullable<File>;
  onChangeUploadedImage?: (file: Nullable<File>) => void;
  sendMessage: ReturnType<typeof useSendMessage>;
};

const InputText = ({
  uploadedImage,
  onChangeUploadedImage,
  sendMessage,
}: InputTextProps) => {
  const inputMode = uploadedImage ? "image" : "text";
  const [chatMsgLength, setChatMsgLength] = useState<number>(0);
  const maxChatMsgLength = 140; // 채팅 입력 최대 길이입니다.
  const children = {
    text: (
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div style={{ width: "20px", height: "20px", marginLeft: "5px" }}>
          <CircularProgressbar
            value={chatMsgLength}
            maxValue={maxChatMsgLength}
            text={`${chatMsgLength}`}
            strokeWidth={20}
            styles={buildStyles({
              // Rotation of path and trail, in number of turns (0-1)
              rotation: 0.25,

              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: "butt",

              // Text size
              textSize: "28px",

              // How long animation takes to go from one chatMsgLength to another, in seconds
              pathTransitionDuration: 0.2,

              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',

              // Colors
              pathColor: `${
                chatMsgLength < maxChatMsgLength
                  ? `rgba(110, 54, 120)`
                  : `rgba(180, 0, 0)`
              }`,
              textColor: "#000000",
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
          />
        </div>
        <div style={{ flex: 1 }}>
          <BodyText sendMessage={sendMessage} onTextChange={setChatMsgLength} />
        </div>
      </div>
    ),
    image: (
      <BodyImage
        uploadedImage={uploadedImage as File}
        onChangeUploadedImage={onChangeUploadedImage}
        sendMessage={sendMessage}
      />
    ),
  }[inputMode];

  return (
    <div
      css={{
        flex: 1,
        position: "relative",
        background: theme.purple_light,
        boxShadow: theme.shadow_purple_input_inset,
        borderRadius: "16px",
        overflow: "hidden",
        minHeight: "32px",
      }}
    >
      {children}
    </div>
  );
};

export default InputText;
