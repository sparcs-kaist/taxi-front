import { useLocation } from "react-router-dom";

import theme from "tools/theme";
import { getDynamicLink } from "tools/trans";

import { ReactComponent as TaxiIcon } from "static/assets/TaxiAppIcon.svg";

const SuggestAppTopBar = () => {
  const { pathname, search } = useLocation();
  const currentPath = pathname + search;

  return (
    <a
      href={getDynamicLink(currentPath, false)}
      target="_blank"
      rel="noreferrer"
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // width: "100%",
        height: "50px",
        backgroundColor: theme.purple,
        textDecoration: "none",
        padding: "0 10px",
      }}
    >
      <div
        css={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
      <div
        css={{
          ...theme.font14_bold,
          borderRadius: "15px",
          padding: "7px 20px",
          backgroundColor: theme.white,
          boxShadow: theme.shadow_3_up,
          color: theme.purple,
        }}
      >
        열기
      </div>
    </a>
  );
};

export default SuggestAppTopBar;
