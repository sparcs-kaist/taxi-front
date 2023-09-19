import { useEffect, useRef, useState } from "react";

import { QuestId } from "types/event2023fall";
import { PopupInAppNotification } from "types/notification";

import { useValueRecoilState } from "hooks/useFetchRecoilState";

import { ModalEvent2023FallMissionComplete } from "components/ModalPopup";

import { sendPopupInAppNotificationEventToFlutter } from "tools/sendEventToFlutter";

const EventProvider = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { completedQuests, quests } =
    useValueRecoilState("event2023FallInfo") || {};

  const prevEventStatusRef = useRef<QuestId[]>();

  useEffect(() => {
    if (!completedQuests || !quests) return;
    prevEventStatusRef.current = prevEventStatusRef.current || completedQuests;
    if (prevEventStatusRef.current.length === completedQuests.length) return;
    
    const questsForCompare = ...completedQuests];
    prevEventStatusRef.current.forEach((questId) => {
      const index = questsForCompare.indexOf(questId);
      if (ind < 0) return;
      questsForCompare.index(ind, 1);
    });
    questsForCompare.forEach((questId) => {
      const quest = quests.find(({ id }) => id === questId);
      if (!quest) return;
      sendPopupInAppNotificationEventToFlutter({
        type: "default",
        imageUrl: quest.imageUrl,
        title: "퀘스트 완료"
        subtitle: quest.name,
        content: quest.description,
        button: { text: "확인하기", to: "/event/2023fall-missions" },
      });
    });
    prevEventStatusRef.current = completedQuests;
  }, [completedQuests]);

  return (
    <ModalEvent2023FallMissionComplete
      isOpen={isOpen}
      onChangeIsOpen={setIsOpen}
    />
  );
};

export default EventProvider;
