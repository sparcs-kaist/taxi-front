import { useEffect, useRef } from "react";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import toast from "@/tools/toast";

export const useEvent2025SpringEffect = () => {
  const { completedQuests, quests } =
    useValueRecoilState("event2025SpringInfo") || {};

  const prevCompletedQuestsRef = useRef<number>();

  useEffect(() => {
    if (!completedQuests || !quests) return;
    prevCompletedQuestsRef.current =
      prevCompletedQuestsRef.current ?? completedQuests.length;

    const lengthDiff = completedQuests.length - prevCompletedQuestsRef.current;
    if (lengthDiff <= 0) {
      prevCompletedQuestsRef.current = completedQuests.length;
      return;
    }

    const newCompletedQuests = completedQuests.slice(-lengthDiff);
    newCompletedQuests.forEach(({ questId }) => {
      const quest = quests.find(({ id }) => id === questId);
      if (!quest) return;
      const notificationValue = {
        type: "default" as const,
        imageUrl: quest.imageUrl,
        title: "퀘스트 완료",
        subtitle: "새학기 이벤트",
        content: `축하합니다! "${quest.name}" 퀘스트를 완료하여 넙죽코인 ${quest.reward.credit}개를 획득하셨습니다.`,
        button: { text: "확인하기", path: "/event/2025spring-missions" },
      };
      toast(notificationValue);
    });
    prevCompletedQuestsRef.current = completedQuests.length;
  }, [completedQuests]);
};
