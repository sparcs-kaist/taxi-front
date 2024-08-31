import { useEffect, useRef } from "react";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import toast from "@/tools/toast";

export const useEvent2024FallEffect = () => {
  const { completedQuests, quests } =
    useValueRecoilState("event2024FallInfo") || {};

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
        subtitle: "추석 이벤트",
        content: `축하합니다! "${quest.name}" 퀘스트를 완료하여 송편코인 ${quest.reward.credit}개를 획득하셨습니다.`,
        button: { text: "확인하기", path: "/event/2024fall-missions" },
      };
      toast(notificationValue);
    });
    prevCompletedQuestsRef.current = completedQuests.length;
  }, [completedQuests]);
};
