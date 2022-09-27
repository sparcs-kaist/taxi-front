import React, { CSSProperties } from "react";
import { theme } from "styles/theme";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onClickPage: (page: number) => void;
  onClickPrev: () => void;
  onClickNext: () => void;
  isMobile: boolean;
};

type PageButtonProps = {
  page: number;
  onClick: () => void;
  selected: boolean;
};

const PageButton = ({ page, onClick, selected }: PageButtonProps) => {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
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

const Pagination = ({
  totalPages,
  currentPage,
  onClickPage,
  onClickPrev,
  onClickNext,
  isMobile,
}: PaginationProps): React.ReactElement => {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "18px",
    width: "100%",
  };

  const styleButtonsWrapper: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "max-content",
    height: "44px",
    borderRadius: "12px",
    background: "white",
    padding: "0 6px",
    boxShadow: isMobile ? theme.shadow : undefined,
  };

  const styleIcon: CSSProperties = {
    color: theme.purple,
    cursor: "pointer",
  };

  return (
    <div style={style}>
      <div style={styleButtonsWrapper}>
        <KeyboardArrowLeftIcon onClick={onClickPrev} style={styleIcon} />
        {Array(Math.min(5, totalPages))
          .fill(0)
          .map((_, idx) => {
            const page =
              currentPage <= 3
                ? idx + 1 // 3페이지 이하일 경우 1페이지부터 시작
                : currentPage >= totalPages - 2
                ? Math.max(1, totalPages - 4 + idx) // 뒤에서 세번째 페이지 이상일 경우 1, total-4 중 큰 페이지부터 시작
                : currentPage - 2 + idx;
            return (
              <PageButton
                page={page}
                onClick={() => onClickPage(page)}
                key={idx}
                selected={page === currentPage}
              />
            );
          })}
        <KeyboardArrowRightIcon onClick={onClickNext} style={styleIcon} />
      </div>
    </div>
  );
};

export default Pagination;
