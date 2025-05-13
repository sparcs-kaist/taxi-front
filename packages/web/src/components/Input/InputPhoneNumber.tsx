import { useEffect, useRef, useState } from "react";

import Input from ".";

type InputPhoneNumberProps = {
  value: string;
  onChangeValue?: (v: string) => void;
  className?: string;
} & Omit<React.ComponentProps<typeof Input>, "value" | "onChange">;

const InputPhoneNumber = ({
  value,
  onChangeValue,
  className,
  ...inputProps
}: InputPhoneNumberProps) => {
  const [part2, setPart2] = useState("");
  const [part3, setPart3] = useState("");

  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const parts = value.split("-");
    setPart2(parts[1] || "");
    setPart3(parts[2] || "");
  }, [value]);

  const handleChangePart2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newVal = e.target.value.replace(/\D/g, "").slice(0, 4);
    setPart2(newVal);
    // part2가 4자리면 part3로 포커스 이동
    if (newVal.length === 4) {
      inputRef3.current?.focus();
    }
    onChangeValue &&
      onChangeValue(["010", newVal, part3].filter(Boolean).join("-"));
  };

  const handleChangePart3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newVal = e.target.value.replace(/\D/g, "").slice(0, 4);
    setPart3(newVal);
    onChangeValue &&
      onChangeValue(["010", part2, newVal].filter(Boolean).join("-"));
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
        ref={inputRef2}
        value={part2}
        onChange={handleChangePart2}
        placeholder="0000"
        css={{
          flexGrow: 1,
          minWidth: 0,
          textAlign: "center",
          "::placeholder": { textAlign: "center" },
        }}
        inputMode="numeric"
        pattern="[0-9]*"
        {...inputProps}
      />
      <div>-</div>
      <Input
        id="tel3"
        ref={inputRef3}
        value={part3}
        onChange={handleChangePart3}
        placeholder="0000"
        css={{
          flexGrow: 1,
          minWidth: 0,
          textAlign: "center",
          "::placeholder": { textAlign: "center" },
        }}
        inputMode="numeric"
        pattern="[0-9]*"
        {...inputProps}
      />
    </div>
  );
};

export default InputPhoneNumber;
