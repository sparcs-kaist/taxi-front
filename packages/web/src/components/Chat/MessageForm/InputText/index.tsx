import useSendMessage from "@/hooks/chat/useSendMessage";

import BodyImage from "./BodyImage";
import BodyText from "./BodyText";

import theme from "@/tools/theme";

type ReplyTarget = {
  chatId: string;
  authorName: string;
  content: string;
} | null;

type InputTextProps = {
  uploadedImage?: Nullable<File>;
  onChangeUploadedImage?: (file: Nullable<File>) => void;
  sendMessage: ReturnType<typeof useSendMessage>;
  replyTarget?: ReplyTarget;
  onClearReplyTarget?: () => void;
};

const InputText = ({
  uploadedImage,
  onChangeUploadedImage,
  sendMessage,
  replyTarget,
  onClearReplyTarget,
}: InputTextProps) => {
  const inputMode = uploadedImage ? "image" : "text";
  const children = {
    text: (
      <BodyText
        sendMessage={sendMessage}
        replyTarget={replyTarget}
        onClearReplyTarget={onClearReplyTarget}
      />
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
