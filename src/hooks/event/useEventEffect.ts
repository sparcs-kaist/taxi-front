import { useEffect, useRef } from "react";

import type { QuestId } from "types/event2023fall";

import { useValueRecoilState } from "hooks/useFetchRecoilState";

import { sendPopupInAppNotificationEventToFlutter } from "tools/sendEventToFlutter";

export const useEventEffect = () => {
  const { completedQuests, quests } =
    useValueRecoilState("event2023FallInfo") || {};

  const prevEventStatusRef = useRef<QuestId[]>();

  useEffect(() => {
    if (!completedQuests || !quests) return;
    prevEventStatusRef.current = prevEventStatusRef.current || completedQuests;
    if (prevEventStatusRef.current.length === completedQuests.length) return;

    const questsForCompare = [...completedQuests];
    prevEventStatusRef.current.forEach((questId) => {
      const index = questsForCompare.indexOf(questId);
      if (index < 0) return;
      questsForCompare.splice(index, 1);
    });
    questsForCompare.forEach((questId) => {
      const quest = quests.find(({ id }) => id === questId);
      if (!quest) return;
      sendPopupInAppNotificationEventToFlutter({
        type: "default",
        imageUrl: quest.imageUrl,
        title: "퀘스트 완료",
        subtitle: quest.name,
        content: quest.description,
        button: { text: "확인하기", path: "/event/2023fall-missions" },
      });
    });
    prevEventStatusRef.current = completedQuests;
  }, [completedQuests]);

  return null;
};
