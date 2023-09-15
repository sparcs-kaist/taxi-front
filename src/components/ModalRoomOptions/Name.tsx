import { memo } from "react";

import WhiteContainer from "components/WhiteContainer";

import theme from "tools/theme";

import EditRoundedIcon from "@material-ui/icons/EditRounded";

type ButtonProps = {
  value: string;
  handler: (value: string) => void;
  placeholder: string;
};

const Name = (props: ButtonProps) => {
  const style = {
    display: "flex",
    alignItems: "center",
  };
  const styleIcon = {
    fontSize: "16px",
    marginLeft: "15px",
  };
  const styleName: CSS = {
    ...theme.font14,
    margin: "0 8px 0 6px",
    whiteSpace: "nowrap",
  };
  const styleInput = {
    ...theme.font14,
    width: "100%",
    padding: "6px 12px",
    borderRadius: "6px",
    backgroundColor: theme.purple_light,
    boxShadow: theme.shadow_purple_input_inset,
    border: "none",
    outline: "none",
  };
  return (
    <WhiteContainer css={{ padding: "9px" }}>
      <div style={style}>
        <EditRoundedIcon style={styleIcon} />
        <div style={styleName}>방 이름 :</div>
        <input
          onChange={(e) => props.handler(e.target.value)}
          type="text"
          style={styleInput}
          value={props.value}
          placeholder={props.placeholder}
        />
      </div>
    </WhiteContainer>
  );
};

export default memo(Name);
