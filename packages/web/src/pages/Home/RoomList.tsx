import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import usePageFromSearchParams from "@/hooks/usePageFromSearchParams";

import Empty from "@/components/Empty";
import Pagination, { PAGE_MAX_ITEMS } from "@/components/Pagination";
import Room from "@/components/Room";

import NewRoom from "./NewRoom";

type RoomListProps = {
  rooms: Nullable<Array<any>>;
};

const RoomList = (props: RoomListProps) => {
  const totalPages = Math.ceil((props.rooms ?? []).length / PAGE_MAX_ITEMS);
  const currentPage = usePageFromSearchParams(totalPages);
  const [localRooms, setLocalRooms] = useState(props.rooms);

  const [state, setState] = useState<
    "default" | "additionAnimate" | "addition" | "deletionAnimate" | "deletion"
  >("default");

  const animateDeletion = () => {
    const deletionRooms = localRooms?.map((localRoom) => {
      if (!props.rooms?.find((room) => room._id === localRoom._id)) {
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
    let additionRooms = props.rooms?.map((room, index) => {
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
    setLocalRooms(props.rooms);
    setState("default");
  };

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

  useEffect(() => {
    if (
      props.rooms &&
      localRooms?.length &&
      (props.rooms.length !== localRooms.length ||
        JSON.stringify(props.rooms) !== JSON.stringify(localRooms.length))
    ) {
      setState("deletionAnimate");
    } else {
      setLocalRooms(props.rooms);
    }
  }, [props.rooms]);

  return (
    <>
      {localRooms?.length ? (
        <>
          {localRooms
            ?.slice(
              PAGE_MAX_ITEMS * (currentPage - 1),
              PAGE_MAX_ITEMS * currentPage
            )
            .map((room) => (
              <Link
                key={room._id}
                to={`/home/${room._id}?page=${currentPage}`}
                replace
                style={{ textDecoration: "none" }}
              >
                {room.animating ? (
                  <NewRoom room={room} marginBottom="15px" type={room.type} />
                ) : (
                  <Room data={room} marginBottom="15px" />
                )}
              </Link>
            ))}
          {localRooms.length > PAGE_MAX_ITEMS && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              isMobile
            />
          )}
        </>
      ) : (
        <Empty type="mobile" css={{ marginBottom: "15px" }}>
          해당 요일에 개설된 방이 없습니다
        </Empty>
      )}
    </>
  );
};

export default RoomList;
