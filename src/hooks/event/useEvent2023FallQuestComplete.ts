import { useCallback } from "react";

import { QuestId } from "types/event2023fall";

import {
  useFetchRecoilState,
  useValueRecoilState,
} from "hooks/useFetchRecoilState";

export const useEvent2023FallQuestComplete = (id: QuestId) => {
  const fetchEvent2023FallInfo = useFetchRecoilState("event2023FallInfo");

  const { completedQuests, quests } =
    useValueRecoilState("event2023FallInfo") || {};

  return useCallback(() => {
    if (!completedQuests || !quests) return;
    const questMaxCount =
      quests?.find((quest) => quest.id === id)?.maxCount || 0;
    const questCompletedCount =
      completedQuests?.filter((questId) => questId === id).length || 0;
    questCompletedCount < questMaxCount && fetchEvent2023FallInfo();
  }, [completedQuests, id, fetchEvent2023FallInfo]);
};
