import { useCallback } from "react";

import type { QuestId } from "@/types/event2024spring";

import {
  useFetchRecoilState,
  useValueRecoilState,
} from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

export const useEvent2024SpringQuestComplete = () => {
  const axios = useAxios();
  const fetchEvent2024SpringInfo = useFetchRecoilState("event2024SpringInfo");
  const { completedQuests, quests } =
    useValueRecoilState("event2024SpringInfo") || {};

  return useCallback(
    (id: QuestId) => {
      if (!completedQuests || !quests) return;
      const questMaxCount =
        quests?.find((quest) => quest.id === id)?.maxCount || 0;
      const questCompletedCount = completedQuests?.filter(
        (questId) => questId === id
      ).length;
      if (questMaxCount > 0 && questCompletedCount >= questMaxCount) return;
      if (["roomSharing"].includes(id)) {
        axios({
          url: `/events/2024spring/quests/complete/${id}`,
          method: "post",
          onSuccess: () => fetchEvent2024SpringInfo(),
        });
      } else fetchEvent2024SpringInfo();
    },
    [completedQuests, fetchEvent2024SpringInfo, quests]
  );
};
