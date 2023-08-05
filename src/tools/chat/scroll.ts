// 스크롤이 페이지 상단에 있는지 여부를 반환 (tol = 허용오차)
export const isTopOnScroll = (element: HTMLDivElement, tol: number = 0) => {
  if (!element) return false;
  const scrollTop = Math.max(element.scrollTop, 0);
  return scrollTop <= tol;
};

// 스크롤이 페이지 하단에 있는지 여부를 반환 (tol = 허용오차)
export const isBottomOnScroll = (element: HTMLDivElement, tol: number = 20) => {
  if (!element) return false;
  const scrollHeight = element.scrollHeight;
  const scrollTop = Math.max(element.scrollTop, 0);
  const clientHeight = element.clientHeight;
  const scrollBottom = Math.max(scrollHeight - clientHeight - scrollTop, 0);
  return scrollBottom <= tol;
};

// 스크롤을 페이지 하단으로 이동
export const scrollToBottom = (
  element: HTMLDivElement,
  doAnimation = false
) => {
  if (!element) return;
  const scrollTop = element.scrollHeight - element.clientHeight;
  if (doAnimation) {
    element.scroll({
      behavior: "smooth",
      top: scrollTop,
    });
  } else {
    element.scrollTop = scrollTop;
  }
};
