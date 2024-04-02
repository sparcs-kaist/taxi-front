import { memo } from "react";

import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

import WalletRoundedIcon from "@mui/icons-material/WalletRounded";

type ButtonProps = {
  value: number;
  roomLength: number;
};

const TaxiFare = (props: ButtonProps) => {
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
  return (
    <WhiteContainer css={{ padding: "9px" }}>
      <div style={style}>
        <WalletRoundedIcon style={styleIcon} />
        <div css={{ ...styleName }}>
          예상 택시비 : {props.value.toLocaleString("ko-KR")}원 /{" "}
          {props.roomLength}명 = {""}
          <span css={theme.font14_bold}>
            인당 {(props.value / props.roomLength).toLocaleString("ko-KR")}원
          </span>{" "}
        </div>
      </div>
    </WhiteContainer>
  );
};

export default memo(TaxiFare);
