import { useCallback, useState } from "react";

import hoverEventSet from "tools/hoverEventSet";
import theme from "tools/theme";

type ToggleProps = {
  value: boolean;
  width?: PixelValue;
  onChangeValue?: (value: boolean) => void;
};

const Toggle = ({ value, width = "48px", onChangeValue }: ToggleProps) => {
  const [isHover, setIsHover] = useState(false);
  const onClick = useCallback(() => {
    onChangeValue && onChangeValue(!value);
    setIsHover(false);
  }, [value, onChangeValue]);

  const style = {
    width,
    height: "24px",
    background: value ? theme.purple : theme.purple_hover,
    boxShadow: value
      ? theme.shadow_purple_button_inset
      : theme.shadow_purple_input_inset,
    overflow: "hidden",
    borderRadius: "12px",
    display: "flex",
    position: "relative" as any,
    transition: `all ${theme.duration} ease-in-out`,
    cursor: "pointer",
  };
  const styleEmpty = {
    width: value
      ? isHover
        ? "calc(100% - 26px)"
        : "calc(100% - 24px)"
      : isHover
      ? "4px"
      : "0px",
    transition: `all ${theme.duration} ease-in-out`,
  };
  const styleBtn = {
    width: "20px",
    height: "20px",
    background: theme.white,
    boxShadow: theme.shadow,
    borderRadius: "10px",
    margin: "2px",
  };

  return (
    <div css={style} onClick={onClick} {...hoverEventSet(setIsHover)}>
      <div css={styleEmpty} />
      <div css={styleBtn} />
    </div>
  );
};

export default Toggle;
