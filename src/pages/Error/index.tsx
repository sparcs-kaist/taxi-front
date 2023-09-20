import { useHistory } from "react-router-dom";

import Button from "components/Button";

import errorAtom from "atoms/error";
import { useRecoilState } from "recoil";

import theme from "tools/theme";

import { ReactComponent as TaxiLogo } from "static/assets/sparcsLogos/TaxiLogo.svg";

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
          css={{
            padding: "13px 24px 14px",
            borderRadius: "12px",
            ...theme.font14,
          }}
          onClick={onClickBack}
        >
          이전 페이지
        </Button>
        <Button
          type="purple"
          css={{
            padding: "13px 24px 14px",
            borderRadius: "12px",
            ...theme.font14_bold,
          }}
          onClick={onClickHome}
        >
          홈으로 가기
        </Button>
      </div>
    </div>
  );
};

export default Error;
