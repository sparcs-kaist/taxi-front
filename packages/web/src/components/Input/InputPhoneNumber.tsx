import { useState, useEffect } from "react";
import Input from ".";

type InputPhoneNumberProps = {
  value: string; 
  onChangeValue?: (v: string) => void;
  className?: string; 
} & Omit<React.ComponentProps<typeof Input>, 'value' | 'onChange'>;

const InputPhoneNumber = ({
  value,
  onChangeValue,
  className,
  ...inputProps
}: InputPhoneNumberProps) => {
  const [part1, setPart1] = useState("");
  const [part2, setPart2] = useState("");
  const [part3, setPart3] = useState("");

  useEffect(() => {
    const parts = value.split("-");
    setPart1(parts[0] || "");
    setPart2(parts[1] || "");
    setPart3(parts[2] || "");
  }, [value]);

  const handleChange = (
    setter: (val: string) => void,
    part: "part1" | "part2" | "part3"
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let newVal = e.target.value.replace(/\D/g, "");
    const maxLength = part === "part1" ? 3 : 4;
    newVal = newVal.slice(0, maxLength);

    setter(newVal);
    
    const newPart1 = part === "part1" ? newVal : part1;
    const newPart2 = part === "part2" ? newVal : part2;
    const newPart3 = part === "part3" ? newVal : part3;
    onChangeValue && onChangeValue([newPart1, newPart2, newPart3].filter(Boolean).join("-"));
  };

  return (
    <div
      className={className}
      css={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        overflow: "hidden",
      }}
    >
      <Input
        value={part1}
        onChange={handleChange(setPart1, "part1")}
        placeholder="010"
        css={{ flexGrow: 0.75, minWidth: 0 }}
        inputMode="numeric"
        pattern="[0-9]*"
        {...inputProps}
      />
      -
      <Input
        value={part2}
        onChange={handleChange(setPart2, "part2")}
        placeholder="0000"
        css={{ flexGrow: 1, minWidth: 0 }}
        inputMode="numeric"
        pattern="[0-9]*"
        {...inputProps}
      />
      -
      <Input
        value={part3}
        onChange={handleChange(setPart3, "part3")}
        placeholder="0000"
        css={{ flexGrow: 1, minWidth: 0 }}
        inputMode="numeric"
        pattern="[0-9]*"
        {...inputProps}
      />
    </div>
  );
};

export default InputPhoneNumber;
