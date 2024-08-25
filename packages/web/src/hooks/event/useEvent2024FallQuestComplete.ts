import { useCallback } from "react";

import type { QuestId } from "@/types/event2024fall";

import {
  useFetchRecoilState,
  useValueRecoilState,
} from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

export const useEvent2024FallQuestComplete = () => {
  const axios = useAxios();
  const fetchEvent2024FallInfo = useFetchRecoilState("event2024FallInfo");
  const { completedQuests, quests } =
    useValueRecoilState("event2024FallInfo") || {};

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
          url: `/events/2023fall/quests/complete/${id}`, // ToDo : 2023fall 엔드포인트
          method: "post",
          onSuccess: () => fetchEvent2024FallInfo(),
        });
      } else fetchEvent2024FallInfo();
    },
    [completedQuests, fetchEvent2024FallInfo, quests]
  );
};
