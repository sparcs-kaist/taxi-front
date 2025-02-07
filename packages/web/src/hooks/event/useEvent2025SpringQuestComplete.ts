import { useCallback } from "react";

import type { QuestId } from "@/types/event2025spring";

import {
  useFetchRecoilState,
  useValueRecoilState,
} from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

export const useEvent2025SpringQuestComplete = () => {
  const axios = useAxios();
  const fetchEvent2025SpringInfo = useFetchRecoilState("event2025SpringInfo");
  const { completedQuests, quests } =
  useValueRecoilState("event2025SpringInfo") || {};

  return useCallback(
    (id: QuestId) => {
      if (!completedQuests || !quests) return;
      const questMaxCount =
        quests.find((quest) => quest.id === id)?.maxCount ?? 0;
      const questCompletedCount = completedQuests?.filter(
        ({ questId }) => questId === id
      ).length;
      if (questMaxCount > 0 && questCompletedCount >= questMaxCount) return;
      if (["roomSharing", "dailyAttendance"].includes(id)) {
        axios({
          url: `/events/2025spring/quests/complete/${id}`,
          method: "post",
          onSuccess: () => fetchEvent2025SpringInfo(),
        });
      } else fetchEvent2025SpringInfo();
    },
    [completedQuests, fetchEvent2025SpringInfo, quests]
  );
};
