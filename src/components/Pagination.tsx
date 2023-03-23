import qs from "qs";
import { ReactElement } from "react";
import { useHistory, useLocation } from "react-router-dom";

import theme from "tools/theme";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRightRounded";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  isMobile: boolean;
};

type PageButtonProps = {
  page: number;
  onClick: () => void;
  selected: boolean;
};

export const PAGE_MAX_ITEMS = 20;

const PageButton = ({ page, onClick, selected }: PageButtonProps) => {
  const style: CSS = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    boxSizing: "border-box",
    backgroundColor: selected ? theme.purple : theme.purple_background,
    boxShadow: selected
      ? theme.shadow_purple_button_inset
      : theme.shadow_purple_input_inset,
    color: selected ? "white" : "black",
    borderRadius: "6px",
    cursor: "pointer",
    margin: "0 3px",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "14px",
  };

  return (
    <div style={style} onClick={onClick}>
      <p>{page}</p>
    </div>
  );
};

const getNewQuery = (prevQuery: string, newPage: number) => {
  const q = qs.parse(prevQuery.slice(1));
  return qs.stringify({ ...q, page: newPage });
};

const Pagination = ({
  totalPages,
  currentPage,
  isMobile,
}: PaginationProps): ReactElement => {
  const location = useLocation();
  const history = useHistory();

  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: isMobile ? "20px 0 0" : "8px 0 -14px",
    width: "100%",
  };

  const styleButtonsWrapper: CSS = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "max-content",
    height: "44px",
    borderRadius: "12px",
    padding: "0 6px",
    background: theme.white,
    boxShadow: isMobile ? theme.shadow : undefined,
  };

  const styleIcon: CSS = {
    color: theme.purple,
    cursor: "pointer",
  };

  const pageClickHandler = (page: number) => {
    history.push(`${location.pathname}?${getNewQuery(location.search, page)}`);
  };

  const prevPageHandler = () => {
    if (currentPage <= 1) return;
    history.push(
      `${location.pathname}?${getNewQuery(location.search, currentPage - 1)}`
    );
  };

  const nextPageHandler = () => {
    if (currentPage >= totalPages) return;
    history.push(
      `${location.pathname}?${getNewQuery(location.search, currentPage + 1)}`
    );
  };

  return (
    <div style={style}>
      <div style={styleButtonsWrapper}>
        <KeyboardArrowLeftIcon onClick={prevPageHandler} style={styleIcon} />
        {Array(Math.min(5, totalPages))
          .fill(0)
          .map((_, idx) => {
            const page =
              currentPage <= 3
                ? idx + 1 // 3페이지 이하일 경우 1페이지부터 시작
                : currentPage >= totalPages - 2
                ? Math.max(1, totalPages - 4) + idx // 뒤에서 세번째 페이지 이상일 경우 1, total-4 중 큰 페이지부터 시작
                : currentPage - 2 + idx;
            return (
              <PageButton
                page={page}
                onClick={() => pageClickHandler(page)}
                key={idx}
                selected={page === currentPage}
              />
            );
          })}
        <KeyboardArrowRightIcon onClick={nextPageHandler} style={styleIcon} />
      </div>
    </div>
  );
};

export default Pagination;
