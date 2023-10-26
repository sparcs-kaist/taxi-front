import AdaptiveDiv from "@/components/AdaptiveDiv";
import theme from "@/tools/theme";
import { ReactNode } from "react";
import { useHistory } from "react-router-dom";

import Header from ".";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

type HeaderWithBackButtonProps = {
  isDisplayBackBtn?: boolean;
  children?: ReactNode;
} & Omit<Parameters<typeof AdaptiveDiv>[0], "type">;

const HeaderWithBackButton = ({
  isDisplayBackBtn = true,
  children,
  ...adaptiveDivProps
}: HeaderWithBackButtonProps) => {
  const history = useHistory();

  const styleBody = {
    height: "100%",
    display: "flex",
    gap: "16px",
    alignItems: "center",
  };
  const styleIconLarge = {
    fill: theme.purple,
    ...theme.cursor(),
    width: "24px",
    height: "24px",
  };

  return (
    <Header>
      <AdaptiveDiv type="center" css={styleBody} {...adaptiveDivProps}>
        {isDisplayBackBtn && (
          <ArrowBackRoundedIcon
            style={styleIconLarge}
            onClick={
              history.length <= 1
                ? () => history.replace("/myroom")
                : () => history.goBack()
            }
          />
        )}
        <div css={{ flexGrow: 1 }}>{children}</div>
      </AdaptiveDiv>
    </Header>
  );
};

export default HeaderWithBackButton;
