import React from "react";

type PaginationProps = {
  totalPages: number,
  currentPage: number,
  onClickPage: (page: number) => void,
  onClickPrev: () => void,
  onClickNext: () => void,
};

const Pagination = ({
  totalPages,
  currentPage,
  onClickPage,
  onClickPrev,
  onClickNext,
}: PaginationProps) => {
  return <div>페이지네이션</div>;
};

export default Pagination;
