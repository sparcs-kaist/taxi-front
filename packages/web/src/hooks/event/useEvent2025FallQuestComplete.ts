import { useCallback } from "react";

import type { QuestId } from "@/types/event2025fall";

import {
  useFetchRecoilState,
  useValueRecoilState,
} from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

export const useEvent2025FallQuestComplete = () => {
  const axios = useAxios();
  const fetchEvent2025FallInfo = useFetchRecoilState("event2025FallInfo");
  const { completedQuests, quests } =
    useValueRecoilState("event2025FallInfo") || {};

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
          url: `/events/2025fall/quests/complete/${id}`,
          method: "post",
          onSuccess: () => fetchEvent2025FallInfo(),
        });
      } else fetchEvent2025FallInfo();
    },
    [completedQuests, fetchEvent2025FallInfo, quests]
  );
};
