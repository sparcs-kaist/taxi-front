import { ReactNode, useState } from "react";

import hoverEventSet from "tools/hoverEventSet";
import theme, { Font } from "tools/theme";

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
          boxShadow:
            isClicked && !disabled ? theme.shadow_clicked : theme.shadow,
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
      {...hoverEventSet(setHover, setClicked)}
    >
      {children}
    </div>
  );
};

export default Button;
