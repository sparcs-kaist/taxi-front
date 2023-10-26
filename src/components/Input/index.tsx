import theme from "@/tools/theme";
import { HTMLProps } from "react";

type InputProps = {
  value?: string;
  onChangeValue?: (v: string) => void;
  className?: string; // for emotion (css props)
} & HTMLProps<HTMLInputElement>;

const Input = ({
  value,
  onChangeValue,
  className,
  ...inputProps
}: InputProps) => (
  <input
    value={value}
    onChange={(e) => onChangeValue?.(e.target.value)}
    className={className}
    css={{
      border: "none",
      outline: "none",
      borderRadius: "6px",
      padding: "6px 12px",
      background: theme.purple_light,
      boxShadow: theme.shadow_purple_input_inset,
      ...theme.font14,
    }}
    {...inputProps}
  />
);

export default Input;
