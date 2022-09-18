import React, { useState } from "react";
import { theme } from "styles/theme";
import isMobile from "ismobilejs";

type ButtonType = "purple" | "purple_inset" | "gray";

type ButtonProps = {
  buttonType?: ButtonType;
  disabled?: boolean;
  padding?: string | number;
  radius?: number;
  fontSize?: number;
  fontWeight?: "regular" | "bold";
  onClick?: () => void;
  children?: React.ReactNode;
};

const Button = ({
  buttonType,
  disabled = false,
  padding,
  radius,
  fontWeight,
  fontSize = 16,
  onClick,
  children,
}: ButtonProps) => {
  const [isHover, setHover] = useState(false);
  const [isClicked, setClicked] = useState(false);
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
      default:
        return {};
    }
  };
  const style = {
    padding: padding,
    borderRadius: radius,
    fontSize: fontSize,
    fontWeight: fontWeight,
    transitionDuration: theme.duration,
    textAlign: "center" as const,
    cursor: disabled ? "not-allowed" : "pointer",
    ...getColor(),
  };
  return (
    <div
      onClick={onClick}
      style={{ ...style }}
      onMouseEnter={() => setHover(!(isMobile().phone || isMobile().tablet))}
      onMouseLeave={() => {
        setHover(false);
        setClicked(false);
      }}
      onMouseDown={() => setClicked(true)}
      onMouseUp={() => setClicked(false)}
      onTouchStart={() => {
        setHover(true);
        setClicked(true);
      }}
      onTouchEnd={() => {
        setHover(false);
        setClicked(false);
      }}
    >
      {children}
    </div>
  );
};

export default Button;
