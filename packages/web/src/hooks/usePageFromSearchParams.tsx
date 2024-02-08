import qs from "qs";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const usePageFromSearchParams = (totalPages: number) => {
  const location = useLocation();
  const { search } = location;

  const getPage = useCallback(() => {
    const q = qs.parse(search.slice(1));
    const currentPage = Number(q.page);
    if (
      Number.isNaN(currentPage) ||
      currentPage < 1 ||
      currentPage > totalPages
    )
      return 1;
    else return currentPage;
  }, [search, totalPages]);

  const [page, setPage] = useState(getPage());

  useEffect(() => {
    setPage(getPage());
  }, [search, totalPages]);

  return page;
};

export default usePageFromSearchParams;
