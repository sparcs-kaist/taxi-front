import bankNames from "@/static/bankNames";
import { useEffect, useMemo, useState } from "react";

import Input from ".";
import Select from "./Select";

type InputAcountProps = {
  value: string;
  onChangeValue?: (v: string) => void;
  className?: string; // for emotion (css props)
} & Parameters<typeof Input>[0];

const syncValue2Account = (value: string): [string, string] => {
  const splited = value.split(" ");
  const name: string = bankNames.includes(splited?.[0])
    ? splited?.[0]
    : bankNames[0];
  const number: string = (splited?.[1] || "").replace(/[^0-9]/g, "");
  return [name, number];
};

const syncAccount2Value = (_name: string, _number: string): string => {
  if (_number === "") return "";
  const name: string = bankNames.includes(_name) ? _name : bankNames[0];
  const number: string = _number.replace(/[^0-9]/g, "");
  return name + " " + number;
};

const InputAcount = ({
  value,
  onChangeValue,
  className,
  ...inputProps
}: InputAcountProps) => {
  const [_name, number] = useMemo(() => syncValue2Account(value), [value]);
  const [name, setName] = useState<string>(_name);

  useEffect(() => {
    if (number !== "") setName(_name);
  }, [_name, number]);

  const onChangeName = (nameAfter: string) => {
    setName(nameAfter);
    onChangeValue?.(syncAccount2Value(nameAfter, number));
  };
  const onChangeNumber = (numberAfter: string) => {
    onChangeValue?.(syncAccount2Value(name, numberAfter));
  };

  return (
    <span
      className={className}
      css={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        overflow: "hidden",
      }}
    >
      <Select
        value={name}
        options={bankNames.map((name) => ({ value: name, label: name }))}
        onChangeValue={onChangeName}
      />
      <Input
        value={number}
        onChangeValue={onChangeNumber}
        css={{ flexGrow: 1, minWidth: 0 }}
        {...inputProps}
      />
    </span>
  );
};

export default InputAcount;
