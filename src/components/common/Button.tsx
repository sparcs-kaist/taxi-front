import React, { useState } from "react";
import { theme } from "styles/theme";

type ButtonType = "purple" | "purple_inset" | "gray";

type ButtonProps = {
  buttonType?: ButtonType;
  disabled?: boolean;
  padding?: string | number;
  radius?: number;
  fontWeight?: "regular" | "bold";
  onClick?: () => void;
  children?: React.ReactNode;
};

const Button = ({
  buttonType,
  disabled = false,
  padding,
  radius,
  fontWeight = "regular",
  onClick,
  children,
}: ButtonProps) => {
  const [isHover, setHover] = useState(false);

  const [isClicked, setClicked] = useState(false);
  const getColor = () => {
    switch (buttonType) {
      case "purple":
        return "";
      case "purple_inset":
        return "";
      case "gray":
        return "";
      default:
        return "";
    }
  };
  const style = {
    padding: padding,
    borderRadius: radius,
    fontWeight: fontWeight,
    textAlign: "center" as const,
  };
  return (
    <div onClick={onClick} style={{ ...style }}>
      {children}
    </div>
  );
};

export default Button;
