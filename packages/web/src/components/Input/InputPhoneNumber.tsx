import { HTMLProps } from "react";

import theme from "@/tools/theme";

type InputProps = {
  value?: string;
  onChangeValue?: (v: string) => void;
  className?: string; // for emotion (css props)
} & HTMLProps<HTMLInputElement>;

const InputPhoneNumber = ({
  value,
  onChangeValue,
  className,
  ...inputProps
}: InputProps) => (
  <input 
    type="string"           
    placeholder="010-0000-0000"
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

export default InputPhoneNumber;
