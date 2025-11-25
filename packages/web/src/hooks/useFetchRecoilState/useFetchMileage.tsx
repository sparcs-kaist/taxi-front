import { useCallback } from "react";

import { useAxios } from "@/hooks/useTaxiAPI";
import { AxiosOption } from "@/hooks/useTaxiAPI/useAxios";

import { useValueRecoilState } from ".";

import mileageAtom from "@/atoms/mileage";
import { useRecoilValue, useSetRecoilState } from "recoil";

// Getter & Setter
export const useValueMileage = () => useRecoilValue(mileageAtom);
export const useSetMileage = () => useSetRecoilState(mileageAtom);
export const useFetchMileage = () => {
  const setMileage = useSetMileage();
  const axios = useAxios();
  const { id: userId } = useValueRecoilState("loginInfo") || {};

  return useCallback(
    (onError?: AxiosOption["onError"]) => {
      if (userId) {
        axios({
          url: "/mileage/summary", // 백엔드의 마일리지 요약 API 엔드포인트
          method: "get",
          onSuccess: (data) => setMileage(data), // 받아온 데이터를 Recoil Atom에 저장
          onError: onError,
        });
      } else {
        setMileage(null);
      }
    },
    [userId, setMileage, axios]
  );
};
