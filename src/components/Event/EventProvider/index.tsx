import { useEffect, useRef, useState } from "react";

import { PopupInAppNotification } from "types/notification";

import { useValueRecoilState } from "hooks/useFetchRecoilState";

import { ModalEvent2023FallMissionComplete } from "components/ModalPopup";

import { sendPopupInAppNotificationEventToFlutter } from "tools/sendEventToFlutter";

const EventProvider = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { eventStatus, events } =
    useValueRecoilState("event2023FallInfo") || {};

  const prevEventStatusRef = useRef<string[]>();

  useEffect(() => {
    if (
      !eventStatus ||
      !prevEventStatusRef.current ||
      !events ||
      prevEventStatusRef.current.length === eventStatus?.length
    )
      return;

    let currentEventStatus = [...eventStatus];

    prevEventStatusRef.current.forEach((event) => {
      const ind = currentEventStatus.indexOf(event);
      if (ind === -1) return;
      currentEventStatus.splice(ind, 1);
    });

    currentEventStatus.forEach((id) => {
      const event = events.find((e) => e._id === id);
      if (!event) return;
      const popup: PopupInAppNotification = {
        type: "default",
        imageUrl: event.imageUrl,
        title: event.name,
        subtitle: event.description,
        content: undefined,
        button: undefined,
      };
      sendPopupInAppNotificationEventToFlutter(popup);
    });

    prevEventStatusRef.current = eventStatus;
  }, [eventStatus]);

  return (
    <ModalEvent2023FallMissionComplete
      isOpen={isOpen}
      onChangeIsOpen={setIsOpen}
    />
  );
};

export default EventProvider;
