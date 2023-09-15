import { ReactNode } from "react";

import useHoverProps from "hooks/theme/useHoverProps";

import theme from "tools/theme";

type ButtonProps = {
  children: ReactNode;
  isVaild?: boolean;
  onClick?: () => void;
};

const Button = ({ children, isVaild = true, onClick }: ButtonProps) => {
  const [hoverProps, isHover, isClicked] = useHoverProps();

  const styleButton = {
    padding: "7px 6px 6px",
    flex: 1,
    borderRadius: "8px",
    /* @fixme: button과 css 중복됨 */
    background: isVaild
      ? isHover
        ? theme.purple_dark
        : theme.purple
      : theme.purple_disabled,
    transitionDuration: theme.duration,
    boxShadow: isClicked && isVaild ? theme.shadow_clicked : theme.shadow,
    color: theme.white,
    ...theme.font14,
    textAlign: "center" as any,
    ...theme.cursor(),
  };

  return (
    <div css={styleButton} {...hoverProps} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
