export const scrollTo = (scrollnumber = 0): number =>
  window.requestAnimationFrame(() => {
    console.log("scroll", scrollnumber);
    window.scrollTo(0, scrollnumber);
  });

export const getScrollPage = (): number => {
  let docScrollTop = 0;
  if (document.documentElement && document.documentElement !== null) {
    docScrollTop = document.documentElement.scrollTop;
  }
  return window.pageYOffset || docScrollTop;
};

export const isBothStartsWith = (
  prev: string,
  next: string,
  prefix: string
): boolean => prev.startsWith(prefix) && next.startsWith(prefix);
