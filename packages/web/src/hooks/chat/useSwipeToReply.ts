import { TouchEvent, useCallback, useRef } from "react";

const TRIGGER_PX = 52; // 답장이 트리거되는 드래그 거리
const MAX_PX = 70; // 버블이 끌려가는 최대 거리
const LOCK_PX = 6; // 가로/세로 방향 판정을 위한 최소 이동량

type SwipeHandlers = {
  onTouchStart?: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchMove?: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchEnd?: (e: TouchEvent<HTMLDivElement>) => void;
};

/**
 * 채팅 버블을 가로로 끌어(스와이프) 답장을 트리거하는 터치 제스처 훅.
 * 동시에 한 손가락 제스처만 일어나므로 컴포넌트 단위의 공유 ref로 상태를 관리한다.
 * 반환된 factory를 chats.map 내부에서 호출해 버블별 핸들러를 만든다(훅 규칙 위배 없음).
 */
export default () => {
  const active = useRef<boolean>(false);
  const triggered = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);
  const axis = useRef<null | "h" | "v">(null);

  const reset = (el: HTMLElement) => {
    el.style.transition = "transform 0.2s ease";
    el.style.transform = "";
    const hint = el.parentElement?.querySelector<HTMLElement>(
      "[data-swipe-hint]"
    );
    if (hint) hint.style.opacity = "0";
  };

  return useCallback(
    (
      onReply: () => void,
      towardLeft: boolean,
      disabled: boolean
    ): SwipeHandlers => {
      if (disabled) return {};
      return {
        onTouchStart: (e) => {
          if (e.touches.length !== 1) return;
          active.current = true;
          triggered.current = false;
          axis.current = null;
          startX.current = e.touches[0].clientX;
          startY.current = e.touches[0].clientY;
        },
        onTouchMove: (e) => {
          if (!active.current) return;
          const dx = e.touches[0].clientX - startX.current;
          const dy = e.touches[0].clientY - startY.current;
          if (axis.current === null) {
            if (Math.abs(dx) < LOCK_PX && Math.abs(dy) < LOCK_PX) return;
            axis.current = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
          }
          if (axis.current === "v") return; // 세로 스크롤은 그대로 둔다
          const el = e.currentTarget;
          const dir = towardLeft ? -dx : dx; // 안쪽 방향이면 양수
          if (dir <= 0) {
            el.style.transform = "";
            triggered.current = false;
            const hint = el.parentElement?.querySelector<HTMLElement>(
              "[data-swipe-hint]"
            );
            if (hint) hint.style.opacity = "0";
            return;
          }
          const dist = Math.min(dir, MAX_PX);
          el.style.transition = "none";
          el.style.transform = `translateX(${towardLeft ? -dist : dist}px)`;
          const hint = el.parentElement?.querySelector<HTMLElement>(
            "[data-swipe-hint]"
          );
          if (hint) hint.style.opacity = String(Math.min(dist / TRIGGER_PX, 1));
          const wasTriggered = triggered.current;
          triggered.current = dist >= TRIGGER_PX;
          if (triggered.current && !wasTriggered) navigator.vibrate?.(10);
        },
        onTouchEnd: (e) => {
          if (!active.current) return;
          active.current = false;
          reset(e.currentTarget);
          if (triggered.current) onReply();
          triggered.current = false;
        },
      };
    },
    []
  );
};
