import { useCallback } from "react";

import { useAxios } from "hooks/useTaxiAPI";
import { AxiosOption } from "hooks/useTaxiAPI/useAxios";

import taxiLocationsAtom from "atoms/taxiLocations";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const useValueTaxiLocations = () => useRecoilValue(taxiLocationsAtom);
export const useSetTaxiLocations = () => useSetRecoilState(taxiLocationsAtom);
export const useFetchTaxiLocations = (onError?: AxiosOption["onError"]) => {
  const setTaxiLocations = useSetTaxiLocations();
  const axios = useAxios();

  return useCallback(() => {
    axios({
      url: "/locations",
      method: "get",
      onSuccess: ({ locations }) => setTaxiLocations(locations),
      onError: onError,
    });
  }, [setTaxiLocations, axios]);
};
