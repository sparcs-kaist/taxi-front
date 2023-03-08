const hoverEventSet = (
  setHover: (bool: boolean) => void,
  setClicked: (bool: boolean) => void = () => {}
) => ({
  onMouseEnter: () => setHover(true),
  onMouseDown: () => setClicked(true),
  onTouchStart: () => {
    setHover(true);
    setClicked(true);
  },
  onMouseLeave: () => {
    setHover(false);
    setClicked(false);
  },
  onMouseUp: () => setClicked(false),
  onTouchEnd: () => {
    setHover(false);
    setClicked(false);
  },
  onTouchCancel: () => {
    setHover(false);
    setClicked(false);
  },
});

export default hoverEventSet;
