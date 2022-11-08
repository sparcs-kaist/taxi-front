declare module "react-mobile-picker-mod" {
  import React from "react";

  type OptionGroupsType = { hour: Array<string> } | { min: Array<string> };
  type ValueType = { hour: string } | { min: string };

  type PickerProps = {
    optionGroups: OptionGroupsType;
    valueGroups: ValueType;
    onChange: (key: string, value: string) => void;
    itemHeight: number;
    height: number;
  };

  export default function Picker(props: PickerProps): JSX;
}
