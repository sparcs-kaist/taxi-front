import useSendMessage from "@/hooks/chat/useSendMessage";
import theme from "@/tools/theme";

import BodyImage from "./BodyImage";
import BodyText from "./BodyText";

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
  const children = {
    text: <BodyText sendMessage={sendMessage} />,
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
