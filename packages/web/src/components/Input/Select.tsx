import theme from "@/tools/theme";

import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

type SelectProps = {
  value: string;
  options: Array<{ value: string; label: string }>;
  onChangeValue?: (v: string) => void;
  className?: string; // for emotion (css props)
};

const Select = ({ value, options, onChangeValue, className }: SelectProps) => {
  return (
    <span
      className={className}
      css={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        ...theme.font14,
        color: theme.purple,
        borderRadius: "6px",
        height: "28px",
        padding: "0 19px 0 10px",
        background: theme.purple_light,
        boxShadow: theme.shadow_purple_input_inset,
      }}
    >
      <ArrowDropDownRoundedIcon
        style={{
          width: "16px",
          height: "100%",
          position: "absolute",
          right: "4px",
          top: "0px",
        }}
      />
      {options.find((option) => option.value === value)?.label || ""}
      <select
        value={value}
        onChange={(e) => onChangeValue?.(e.target.value)}
        css={{
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          opacity: 0,
          ...theme.cursor(),
        }}
      >
        {options.map(({ value, label }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </select>
    </span>
  );
};

export default Select;
