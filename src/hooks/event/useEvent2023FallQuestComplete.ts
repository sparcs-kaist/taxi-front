import {
  useFetchRecoilState,
  useValueRecoilState,
} from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";
import type { QuestId } from "@/types/event2023fall";
import { useCallback } from "react";

export const useEvent2023FallQuestComplete = () => {
  const axios = useAxios();
  const fetchEvent2023FallInfo = useFetchRecoilState("event2023FallInfo");
  const { completedQuests, quests } =
    useValueRecoilState("event2023FallInfo") || {};

  return useCallback(
    (id: QuestId) => {
      if (!completedQuests || !quests) return;
      const questMaxCount =
        quests?.find((quest) => quest.id === id)?.maxCount || 0;
      const questCompletedCount = completedQuests?.filter(
        (questId) => questId === id
      ).length;
      if (questCompletedCount >= questMaxCount) return;
      if (
        [
          "roomSharing",
          "eventSharingOnInstagram",
          "purchaseSharingOnInstagram",
        ].includes(id)
      ) {
        axios({
          url: `/events/2023fall/quests/complete/${id}`,
          method: "post",
          onSuccess: () => fetchEvent2023FallInfo(),
        });
      } else fetchEvent2023FallInfo();
    },
    [completedQuests, fetchEvent2023FallInfo, quests]
  );
};
