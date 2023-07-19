import { memo } from "react";

import WhiteContainer from "components/WhiteContainer";

import DatePicker from "./DatePicker";

type DateProps = {
  value: Array<Nullable<number>>;
  handler: (newValue: Array<number>) => void;
};

const Date = (props: DateProps) => {
  return (
    <WhiteContainer padding="10px 15px">
      <DatePicker
        selectedDate={props.value}
        handler={(x: number, y: number, z: number) => props.handler([x, y, z])}
      />
    </WhiteContainer>
  );
};

export default memo(Date);
