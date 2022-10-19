declare module "react-mobile-picker-mod" {
  import React from "react";

  type OptionGroupsType = { hour: number[] } | { min: number[] };
  type ValueType = { hour: number } | { min: number };

  type PickerProps = {
    optionGroups: OptionGroupsType;
    valueGroups: ValueType;
    onChange: (key: string, value: number) => void;
    itemHeight: number;
    height: number;
  };

  export default function Picker(props: PickerProps): JSX;
}
