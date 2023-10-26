import taxiLocationsAtom from "@/atoms/taxiLocations";
import { useAxios } from "@/hooks/useTaxiAPI";
import { AxiosOption } from "@/hooks/useTaxiAPI/useAxios";
import { useCallback } from "react";

import { useRecoilValue, useSetRecoilState } from "recoil";

export const useValueTaxiLocations = () => useRecoilValue(taxiLocationsAtom);
export const useSetTaxiLocations = () => useSetRecoilState(taxiLocationsAtom);
export const useFetchTaxiLocations = () => {
  const setTaxiLocations = useSetTaxiLocations();
  const axios = useAxios();

  return useCallback(
    (onError?: AxiosOption["onError"]) => {
      axios({
        url: "/locations",
        method: "get",
        onSuccess: ({ locations }) => setTaxiLocations(locations),
        onError: onError,
      });
    },
    [setTaxiLocations, axios]
  );
};
