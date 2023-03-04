import { useState, ReactNode, memo } from "react";
import theme, { Font } from "styles/theme";
import isMobile from "tools/isMobile";

type ButtonType = "purple" | "purple_inset" | "gray" | "white";

type ButtonProps = {
  type?: ButtonType;
  disabled?: boolean;
  width?: string;
  padding?: string | number;
  radius?: number;
  font?: Font;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
};

const Button = ({
  type,
  disabled = false,
  width,
  padding,
  radius,
  font,
  onClick,
  className,
  children,
}: ButtonProps) => {
  const [isHover, setHover] = useState(false);
  const [isClicked, setClicked] = useState(false);
  const setHoverClicked = (bool: boolean) => {
    setHover(bool);
    setClicked(bool);
  };
  const getColor = () => {
    switch (type) {
      case "purple":
        return {
          backgroundColor: disabled
            ? theme.purple_disabled
            : isHover
            ? theme.purple_dark
            : theme.purple,
          color: theme.white,
          boxShadow:
            isClicked && !disabled ? theme.shadow_clicked : theme.shadow,
        };
      case "purple_inset":
        return {
          backgroundColor: disabled
            ? theme.purple_disabled
            : isHover
            ? theme.purple_dark
            : theme.purple,
          color: theme.white,
          boxShadow: theme.shadow_purple_button_inset,
        };
      case "gray":
        return {
          backgroundColor: isHover ? theme.gray_line : theme.gray_background,
          color: isHover ? theme.white : theme.gray_text,
          boxShadow: theme.shadow_gray_button_inset,
          fontWeight: isHover ? 500 : undefined,
        };
      case "white":
        return {
          backgroundColor: isHover ? theme.purple_hover : theme.white,
          color: theme.purple,
          boxShadow: isClicked ? theme.shadow_clicked : theme.shadow,
        };
    }
  };

  const style: CSS = {
    ...font,
    width: width,
    padding: padding,
    borderRadius: radius,
    transitionDuration: theme.duration,
    ...theme.cursor(disabled),
    textAlign: "center",
    ...getColor(),
  };

  return (
    <div
      onClick={disabled ? undefined : onClick}
      style={style}
      className={className}
      onMouseEnter={() => setHover(!isMobile)}
      onMouseLeave={() => setHoverClicked(false)}
      onMouseDown={() => setClicked(!disabled)}
      onMouseUp={() => setClicked(false)}
      onTouchStart={() => setHoverClicked(true)}
      onTouchEnd={() => setHoverClicked(false)}
    >
      {children}
    </div>
  );
};

export default memo(Button);
