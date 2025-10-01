import { keyframes } from "@emotion/react";

// 위치 변경 애니메이션 - 더 부드럽고 직관적인 슬라이드 효과
export const smoothMove = keyframes`
  0% {
    transform: translateY(-6px) scale(0.99);
    opacity: 0.9;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  60% {
    transform: translateY(-1px) scale(1.005);
    opacity: 1;
    box-shadow: 0 2px 10px rgba(0,0,0,0.10);
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  }
`;
