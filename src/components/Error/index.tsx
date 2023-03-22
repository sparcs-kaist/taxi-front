import { useRecoilState } from "recoil";
import errorAtom from "atoms/error";

import { Link, useHistory } from "react-router-dom";
import Button from "components/common/Button";

import theme from "tools/theme";
import { ReactComponent as TaxiLogo } from "static/assets/TaxiLogo.svg";

const Error = () => {
  const [error, setError] = useRecoilState(errorAtom);
  const history = useHistory();

  const stylePage: CSS = {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
  };
  const styleLogo = { height: 54, marginBottom: 16 };
  const styleTitle = { ...theme.font20, marginBottom: 12 };
  const styleMessage = {
    ...theme.font12,
    color: theme.gray_text,
    marginBottom: 24,
  };

  const onClickBack = () => {
    setError(null);
    history.goBack();
  };
  const onClickHome = () => {
    setError(null);
    history.replace("/");
  };

  return (
    <div style={stylePage}>
      <TaxiLogo style={styleLogo} />
      <div style={styleTitle}>{error?.title}</div>
      <div style={styleMessage}>{error?.message}</div>
      <div style={{ display: "flex", columnGap: "12px" }}>
        <Button
          type="white"
          padding="13px 24px 14px"
          radius={12}
          font={theme.font14}
          onClick={onClickBack}
        >
          이전 페이지
        </Button>
        <Button
          type="purple"
          padding="13px 24px 14px"
          radius={12}
          font={theme.font14_bold}
          onClick={onClickHome}
        >
          홈으로 가기
        </Button>
      </div>
    </div>
  );
};

export default Error;
