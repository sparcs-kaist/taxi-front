import React, { useEffect, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";

const usePageFromSearchParams = (totalPages: Number) => {
  const location = useLocation();

  const getPage = useCallback(() => {
    const q = qs.parse(location.search.slice(1));
    const currentPage = Number(q.page);
    if (
      Number.isNaN(currentPage) ||
      currentPage < 1 ||
      currentPage > totalPages
    )
      return 1;
    else return currentPage;
  }, [location.search, totalPages]);

  const [page, setPage] = useState(getPage());

  useEffect(() => {
    setPage(getPage());
  }, [location.search, totalPages]);

  return page;
};

export default usePageFromSearchParams;
