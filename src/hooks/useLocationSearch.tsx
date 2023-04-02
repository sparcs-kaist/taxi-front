import { useLocation } from "react-router-dom";
import { useMemo } from "react";

interface ReadOnlyURLSearchParams extends URLSearchParams {
  append: never;
  delete: never;
  sort: never;
}

export default function useLocationSearch() {
  const { search } = useLocation();

  return useMemo(
    () => new URLSearchParams(search) as ReadOnlyURLSearchParams,
    [search]
  );
}
