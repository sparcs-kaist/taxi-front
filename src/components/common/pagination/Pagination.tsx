import React from "react";
import WhiteContainer from "../WhiteContainer";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

type PaginationProps = {
  totalPages: number,
  currentPage: number,
  onClickPage: (page: number) => void,
  onClickPrev: () => void,
  onClickNext: () => void,
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
}: PaginationProps) => {
  const style = {
    marginTop: "18px",
  };

  const stylePagesWrapper = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <div style={style}>
      <WhiteContainer marginAuto={false}>
        <div style={stylePagesWrapper}>
          <KeyboardArrowLeftIcon onClick={onClickPrev} />
          {Array(5)
            .fill(1)
            .map((num, idx) => (
              <PageButton
                page={num}
                onClick={() => {}}
                key={idx}
                selected={idx === currentPage}
              />
            ))}
          <KeyboardArrowRightIcon onClick={onClickNext} />
        </div>
      </WhiteContainer>
    </div>
  );
};

export default Pagination;
