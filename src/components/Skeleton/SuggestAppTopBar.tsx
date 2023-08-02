import { useLocation } from "react-router-dom";

import AdaptiveDiv from "components/AdaptiveDiv";

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
        display: "block",
        backgroundColor: theme.purple,
        textDecoration: "none",
      }}
    >
      <AdaptiveDiv type="center">
        <div
          css={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            height: "50px",
          }}
        >
          <div
            css={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "0",
            }}
          >
            <TaxiIcon
              css={{ width: "30px", height: "30px", flex: "0 0 auto" }}
            />
            <div
              css={{
                ...theme.font10,
                ...theme.ellipsis,
                color: theme.white,
              }}
            >
              <span css={{ ...theme.font14_bold }}>Taxi </span> 앱에서
              <br />
              알림 기능과 채팅을 더 편하게 이용해봐요!
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
              flex: "0 0 auto",
            }}
          >
            앱에서 보기
          </div>
        </div>
      </AdaptiveDiv>
    </a>
  );
};

export default SuggestAppTopBar;
