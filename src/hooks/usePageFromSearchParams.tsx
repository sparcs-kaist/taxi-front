import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";

const usePageFromSearchParams = () => {
  const [isValid, setIsValid] = useState(true);
  const [page, setPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    const q = qs.parse(location.search.slice(1));
    const currentPage = Number(q.page);
    if (Number.isNaN(currentPage)) setIsValid(false);
    else setPage(currentPage);
  }, [JSON.stringify(location)]);

  return { page, isValid };
};

export default usePageFromSearchParams;
