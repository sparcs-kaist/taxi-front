import { useCallback } from "react";

import { useFetchRecoilState } from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

export const useEvent2025SpringSubmitAnswer = (answer: string) => {
  const axios = useAxios();
  const fetchEvent2025SpringInfo = useFetchRecoilState("event2025SpringInfo");

  return useCallback(() => {
    axios({
      url: `/events/2025spring/quizzes/submit`,
      method: "post",
      data: { answer: answer },
      onSuccess: () => fetchEvent2025SpringInfo(),
    });
  }, []);
};
