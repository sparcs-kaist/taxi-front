import { HTMLProps, forwardRef } from "react";
import theme from "@/tools/theme";

type InputProps = {
  value?: string;
  onChangeValue?: (v: string) => void;
  className?: string; // for emotion (css props)
} & HTMLProps<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChangeValue, className, ...inputProps }, ref) => (
    <input
      ref={ref}
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
  )
);

export default Input;
