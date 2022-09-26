import React, { CSSProperties } from "react";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

type PaginationProps = {
  totalPages: number,
  currentPage: number,
  onClickPage: (page: number) => void,
  onClickPrev: () => void,
  onClickNext: () => void,
  isMobile: boolean,
};

type PageButtonProps = {
  page: number,
  onClick: () => void,
  selected: boolean,
};

const PageButton = ({ page, onClick, selected }: PageButtonProps) => {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    backgroundColor: selected ? "#6E3678" : "#FAF6FB",
    boxShadow: selected
      ? "inset 2px 2px 5px -2px rgba(0, 0, 0, 0.25)"
      : "inset 1px 1px 2.5px -1px rgba(110, 54, 120, 0.1)",
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
    boxShadow: isMobile
      ? "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.05), 0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.03), 0px 2px 3px -1px rgba(110, 54, 120, 0.11)"
      : undefined,
  };

  const styleIcon: CSSProperties = {
    color: "#6E3678",
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
                ? idx + 1
                : currentPage >= totalPages - 2
                ? Math.max(1, totalPages - 4 + idx)
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
