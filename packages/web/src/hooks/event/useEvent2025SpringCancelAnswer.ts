import { useCallback } from "react";

import { useFetchRecoilState } from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

export const useEvent2025SpringCancelAnswer = () => {
  const axios = useAxios();
  const fetchEvent2025SpringInfo = useFetchRecoilState("event2025SpringInfo");

  return useCallback(async () => {
    await axios({
      url: `/events/2025spring/quizzes/cancel`,
      method: "post",
      onSuccess: () => fetchEvent2025SpringInfo(),
    });
  }, [axios, fetchEvent2025SpringInfo]);
};
