import { width } from "@mui/system";
import React, { useState, CSSProperties } from "react";
import { theme, Font } from "styles/theme";
import isMobile from "tools/isMobile";

type ButtonType = "purple" | "purple_inset" | "gray" | "white";

type ButtonProps = {
  buttonType?: ButtonType;
  disabled?: boolean;
  width?: string;
  padding?: string | number;
  radius?: number;
  font?: Font;
  onClick?: () => void;
  href?: string;
  children?: React.ReactNode;
};

const Button = ({
  buttonType,
  disabled = false,
  width,
  padding,
  radius,
  font,
  onClick,
  href,
  children,
}: ButtonProps) => {
  const [isHover, setHover] = useState(false);
  const [isClicked, setClicked] = useState(false);
  const setHoverClicked = (bool: boolean) => {
    setHover(bool);
    setClicked(bool);
  };
  const getColor = () => {
    switch (buttonType) {
      case "purple":
        return {
          backgroundColor: disabled
            ? theme.purple_disabled
            : isHover
            ? theme.purple_dark
            : theme.purple,
          color: theme.white,
          boxShadow: isClicked ? theme.shadow_clicked : theme.shadow,
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
        };
      case "white":
        return {
          backgroundColor: isHover ? theme.purple_hover : theme.white,
          color: theme.purple,
          boxShadow: isClicked ? theme.shadow_clicked : theme.shadow,
        };
    }
  };

  const style: CSSProperties = {
    ...font,
    width: width,
    padding: padding,
    borderRadius: radius,
    transitionDuration: theme.duration,
    cursor: theme.cursor(disabled),
    textAlign: "center",
    ...getColor(),
  };

  return (
    <a href={href} style={{ textDecoration: "none" }}>
      <div
        onClick={disabled ? undefined : onClick}
        style={style}
        onMouseEnter={() => setHover(!isMobile)}
        onMouseLeave={() => setHoverClicked(false)}
        onMouseDown={() => setClicked(!disabled)}
        onMouseUp={() => setClicked(false)}
        onTouchStart={() => setHoverClicked(true)}
        onTouchEnd={() => setHoverClicked(false)}
      >
        {children}
      </div>
    </a>
  );
};

export default Button;
