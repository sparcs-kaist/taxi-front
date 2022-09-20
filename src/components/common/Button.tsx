import React, { useState } from "react";
import { theme, Font } from "styles/theme";
import isMobile from "ismobilejs";

type ButtonType = "purple" | "purple_inset" | "gray";

type ButtonProps = {
  buttonType?: ButtonType;
  disabled?: boolean;
  padding?: string | number;
  radius?: number;
  font?: Font;
  onClick?: () => void;
  children?: React.ReactNode;
};

const Button = ({
  buttonType,
  disabled = false,
  padding,
  radius,
  font,
  onClick,
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
    }
  };
  theme.font10;
  const style = {
    ...font,
    padding: padding,
    borderRadius: radius,
    transitionDuration: theme.duration,
    cursor: theme.cursor(disabled),
    textAlign: "center" as const,
    ...getColor(),
  };

  return (
    <div
      onClick={onClick}
      style={{ ...style }}
      onMouseEnter={() => setHover(!(isMobile().phone || isMobile().tablet))}
      onMouseLeave={() => setHoverClicked(false)}
      onMouseDown={() => setClicked(true)}
      onMouseUp={() => setClicked(false)}
      onTouchStart={() => setHoverClicked(true)}
      onTouchEnd={() => setHoverClicked(false)}
    >
      {children}
    </div>
  );
};

export default Button;
