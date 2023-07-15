import theme from "tools/theme";

type SideMenuProps = {
  isOpen: boolean;
  setIsOpen: (x: boolean) => void;
};

const SideMenu = ({ isOpen, setIsOpen }: SideMenuProps) => {
  const styleBackground = {
    position: "absolute" as any,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: theme.black_40,
    zIndex: theme.zIndex_background,
    pointerEvents: isOpen ? "auto" : ("none" as any),
    opacity: isOpen ? 1 : 0,
    transition: "opacity 0.3s",
  };
  const style = {
    position: "absolute" as any,
    top: 0,
    right: isOpen ? 0 : "calc(-100% + 60px)",
    width: "calc(100% - 60px)",
    height: "100%",
    background: theme.white,
    zIndex: theme.zIndex_background,
    transition: "right 0.3s",
  };

  return (
    <>
      <div css={styleBackground} onClick={() => setIsOpen(false)}></div>
      <div css={style}></div>
    </>
  );
};

export default SideMenu;
