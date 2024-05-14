import { useEffect, useState } from "react";

const useRoomListAnimationState = (rooms: Nullable<Array<any>>) => {
  const [state, setState] = useState<
    "default" | "additionAnimate" | "addition" | "deletionAnimate" | "deletion"
  >("default");

  const [localRooms, setLocalRooms] = useState(rooms);

  const animateDeletion = () => {
    const deletionRooms = localRooms?.map((localRoom) => {
      if (!rooms?.find((room) => room._id === localRoom._id)) {
        return { ...localRoom, animating: true, type: "deletion" };
      }
      return localRoom;
    });
    setLocalRooms(deletionRooms);
    const timer = setTimeout(() => {
      setState("deletion");
    }, 500);

    return () => clearTimeout(timer);
  };

  const deletion = () => {
    setLocalRooms(localRooms?.filter((room) => room.type !== "deletion"));
    setState("additionAnimate");
  };

  const animateAddition = () => {
    let additionRooms = rooms?.map((room, index) => {
      if (!localRooms?.find((localRoom) => localRoom._id === room._id)) {
        return { ...room, animating: true, type: "addition" };
      }
      return room;
    });
    setLocalRooms(additionRooms);
    const timer = setTimeout(() => {
      setState("addition");
    }, 500);
    return () => clearTimeout(timer);
  };

  const addition = () => {
    setLocalRooms(rooms);
    setState("default");
  };

  useEffect(() => {
    if (rooms && localRooms?.length && rooms.length !== localRooms.length) {
      setState("deletionAnimate");
    } else {
      setLocalRooms(rooms);
    }
  }, [rooms]);

  useEffect(() => {
    switch (state) {
      case "deletionAnimate":
        animateDeletion();
        break;
      case "deletion":
        deletion();
        break;
      case "additionAnimate":
        animateAddition();
        break;
      case "addition":
        addition();
        break;
      default:
        break;
    }
  }, [state]);

  return { localRooms, state };
};

export default useRoomListAnimationState;
