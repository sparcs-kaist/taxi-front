import { css } from "@emotion/react";

import theme, { Font } from "tools/theme";

type LoadingProps = {
  center?: boolean;
  font?: Font;
  color?: string;
};

const Loading = ({
  center,
  font = theme.font16,
  color = theme.purple,
}: LoadingProps) => {
  const text = css`
    :after {
      ${font}
      color: ${color};
      content: "Loading 🚕";
      animation: loading 1.5s linear infinite;
    }
    @keyframes loading {
      25% {
        content: "Loading. 🚕";
      }
      50% {
        content: "Loading.. 🚕";
      }
      75% {
        content: "Loading... 🚕";
      }
    }
  `;
  const positionCenter = css`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `;
  return <div css={[text, center && positionCenter]} />;
};

export default Loading;
