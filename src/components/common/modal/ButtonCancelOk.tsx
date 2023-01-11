import React from "react";
import PropTypes from "prop-types";
// import Button from "./Button";
import Button from "components/common/Button";
import theme from "styles/theme";

type ButtonGroupProps = {
  nameOk: string;
  onClickCancel: () => void;
  onClickOk: () => void;
};

const ButtonCancelOk = (props: ButtonGroupProps) => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        gap: "10px",
      }}
    >
      <Button
        type="gray"
        width="calc(50% - 5px)"
        padding="10px 0 9px"
        radius={8}
        font={theme.font14}
        onClick={props.onClickCancel}
      >
        돌아가기
      </Button>
      <Button
        type="purple_inset"
        width="calc(50% - 5px)"
        padding="10px 0 9px"
        radius={8}
        font={theme.font14_bold}
        onClick={props.onClickOk}
      >
        {props.nameOk}
      </Button>
    </div>
  );
};

export default ButtonCancelOk;
