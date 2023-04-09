import { css } from "@emotion/react";

import theme from "tools/theme";

const Loading = () => {
  const style = css`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    :after {
      ${theme.font16}
      color: ${theme.purple};
      content: "";
      animation: loading 1.5s linear infinite;
    }
    @keyframes loading {
      0% {
        content: "Loading 🚕";
      }
      25% {
        content: "Loading. 🚕";
      }
      50% {
        content: "Loading.. 🚕";
      }
      75% {
        content: "Loading... 🚕";
      }
      100% {
        content: "Loading 🚕";
      }
    }
  `;
  return <div css={style} />;
};

export default Loading;
