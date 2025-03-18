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

  const [part2, setPart2] = useState("");
  const [part3, setPart3] = useState("");

  useEffect(() => {
    const parts = value.split("-");
    setPart2(parts[1] || "");
    setPart3(parts[2] || "");
  }, [value]);

  const handleChange = (
    setter: (val: string) => void,
    part: "part2" | "part3"
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let newVal = e.target.value.replace(/\D/g, "");
    const maxLength = 4;
    newVal = newVal.slice(0, maxLength);

    setter(newVal);
    
    const newPart1 = "010";
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
      <div>010 -</div>
      <Input
        id="tel2"
        value={part2}
        onChange={handleChange(setPart2, "part2")}
        placeholder="0000"
        css={{ flexGrow: 1, 
          minWidth: 0 ,
          textAlign: "center",
          "::placeholder": {
            textAlign: "center",
          },
        }}
        inputMode="numeric"
        pattern="[0-9]*"
        {...inputProps}
      />
      <div>-</div>
      <Input
        id="tel3"
        value={part3}
        onChange={handleChange(setPart3, "part3")}
        placeholder="0000"
        css={{ flexGrow: 1, 
          minWidth: 0 ,
          textAlign: "center",
          "::placeholder": {
            textAlign: "center",
          },
        }}
        inputMode="numeric"
        pattern="[0-9]*"
        {...inputProps}
      />
    </div>
  );
};

export default InputPhoneNumber;
