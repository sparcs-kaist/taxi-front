import { useEffect, useRef } from "react";

import type { QuestId } from "@/types/event2024spring";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import toast from "@/tools/toast";

export const useEvent2024SpringEffect = () => {
  const { completedQuests, quests } =
    useValueRecoilState("event2024SpringInfo") || {};

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
      const notificationValue = {
        type: "default" as const,
        imageUrl: quest.imageUrl,
        title: "퀘스트 완료",
        subtitle: "새터반 택시대제전",
        content: `축하합니다! "${quest.name}" 퀘스트를 달성하여 넙죽코인 ${quest.reward.credit}개를 획득하셨습니다.`,
        button: { text: "확인하기", path: "/event/2024spring-missions" },
      };
      toast(notificationValue);
    });
    prevEventStatusRef.current = completedQuests;
  }, [completedQuests]);
};
