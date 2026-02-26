import { useCallback } from "react";

import type { QuestId } from "@/types/event2026spring";

import {
  useFetchRecoilState,
  useValueRecoilState,
} from "@/hooks/useFetchRecoilState";

export const useEvent2026SpringQuestComplete = () => {
  const fetchEvent2026SpringInfo = useFetchRecoilState("event2026SpringInfo");
  const { completedQuests, quests } =
    useValueRecoilState("event2026SpringInfo") || {};

  return useCallback(
    (id: QuestId) => {
      if (!completedQuests || !quests) return;
      const questMaxCount =
        quests.find((quest) => quest.id === id)?.maxCount ?? 0;
      const questCompletedCount = completedQuests?.filter(
        ({ questId }) => questId === id
      ).length;
      if (questMaxCount > 0 && questCompletedCount >= questMaxCount) return;
      fetchEvent2026SpringInfo();
    },
    [completedQuests, fetchEvent2026SpringInfo, quests]
  );
};
