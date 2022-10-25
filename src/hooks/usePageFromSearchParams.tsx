import React, { useEffect, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";

const usePageFromSearchParams = () => {
  const location = useLocation();

  const getPage = useCallback(() => {
    const q = qs.parse(location.search.slice(1));
    const currentPage = Number(q.page);
    if (Number.isNaN(currentPage) || currentPage < 1) return 1;
    else return currentPage;
  }, [JSON.stringify(location.search)]);

  const [page, setPage] = useState(getPage());

  useEffect(() => {
    setPage(getPage());
  }, [JSON.stringify(location.search)]);

  return page;
};

export default usePageFromSearchParams;
