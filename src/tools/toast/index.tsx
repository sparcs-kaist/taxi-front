import { Link } from "react-router-dom";
import { toast as _toast } from "react-toastify";
import type { ToastContentProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import type { InAppNotification } from "@/types/inAppNotification";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";

import "./index.css";

// import { sendPopupInAppNotificationEventToFlutter } from "@/tools/sendEventToFlutter";
import theme from "@/tools/theme";

let isToastInitialized = false;

type ToastProps = {
  value: InAppNotification;
};
type BodyToastDefaultProps = {
  value: InAppNotification & { type: "default" };
};
type BodyToastChatProps = {
  value: InAppNotification & { type: "chat" };
};

const BodyToastDefault = ({ value }: BodyToastDefaultProps) => {
  return (
    <>
      <div css={{ display: "flex" }}>
        {value.imageUrl && (
          <div
            css={{
              width: "50px",
              marginRight: "13px",
              flexGrow: 0,
              position: "relative",
            }}
          >
            <div
              css={{
                width: "100%",
                aspectRatio: "1/1",
                border: `1px solid ${theme.gray_line}`,
                borderRadius: "12px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img
                src={value.imageUrl}
                alt=""
                css={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        )}
        <div css={{ flexGrow: 1 }}>
          {(value.title || value.subtitle) && (
            <div css={{ marginBottom: "8px" }}>
              {value.title && (
                <span css={{ ...theme.font10_bold, color: theme.gray_text }}>
                  {value.title}
                </span>
              )}
              {value.subtitle && (
                <span css={{ ...theme.font10, color: theme.gray_text }}>
                  {" "}
                  / {value.subtitle}
                </span>
              )}
            </div>
          )}
          <div css={{ ...theme.font12, color: theme.black }}>
            {value.content || ""}
          </div>
        </div>
      </div>
      <div css={{ display: "flex", justifyContent: "right", marginTop: "8px" }}>
        {value.button && (
          <Link to={value.button.path} css={{ textDecoration: "none" }}>
            <Button
              type="purple_inset"
              css={{
                padding: "7px 20px",
                borderRadius: "15px",
                ...theme.font14_bold,
              }}
            >
              {value.button.text}
            </Button>
          </Link>
        )}
      </div>
    </>
  );
};
const BodyToastChat = ({ value }: BodyToastChatProps) => {
  return <></>;
};

const Toast = ({
  value,
  closeToast,
  toastProps,
}: Partial<ToastContentProps> & ToastProps) => {
  return (
    <AdaptiveDiv type="center">
      <div css={{ height: "21px" }} />
      {value.type === "default" && <BodyToastDefault value={value} />}
      {value.type === "chat" && <BodyToastChat value={value} />}
      <div css={{ height: "16px" }} />
    </AdaptiveDiv>
  );
};

const toast = async (value: InAppNotification) => {
  if (!isToastInitialized) {
    document.documentElement.style.setProperty(
      "--toastify-color-progress-light",
      `${theme.purple}`
    );
    document.documentElement.style.setProperty(
      "--toastify-toast-min-height",
      `0`
    );
  }

  // const result = await sendPopupInAppNotificationEventToFlutter(value);
  // if (!result) _toast(<Toast value={value} />, { autoClose: 5000 });
  _toast(<Toast value={value} />, { autoClose: 5000 });
};

export default toast;
