import theme from "tools/theme";

import { ReactComponent as TaxiIcon } from "static/assets/TaxiAppIcon.svg";

const SuggestAppTopBar = () => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "50px",
        backgroundColor: theme.purple,

        padding: "0 10px",
      }}
    >
      <div css={{ display: "flex" }}>
        <TaxiIcon css={{ width: "30px", height: "30px" }} />
        <div>
          <div css={{ ...theme.font14_bold, color: theme.white }}>
            Taxi For KAIST
          </div>
          <div css={{ ...theme.font10, color: theme.white }}>
            Taxi 앱에서 새롭게 만나보세요!
          </div>
        </div>
      </div>
      <div>열기</div>
    </div>
  );
};

export default SuggestAppTopBar;
