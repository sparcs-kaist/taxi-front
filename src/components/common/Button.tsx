import React, { useState } from "react";
import { theme } from "styles/theme";

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
          backgroundColor: theme.purple,
          color: theme.white,
          boxShadow: theme.shadow,
        };
      case "purple_inset":
        return {
          backgroundColor: theme.purple,
          color: theme.white,
          boxShadow: theme.shadow_purple_button_inset,
        };
      case "gray":
        return {
          backgroundColor: theme.gray_background,
          color: theme.gray_text,
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
    textAlign: "center" as const,
    ...getColor(),
  };
  return (
    <div onClick={onClick} style={{ ...style }}>
      {children}
    </div>
  );
};

export default Button;
