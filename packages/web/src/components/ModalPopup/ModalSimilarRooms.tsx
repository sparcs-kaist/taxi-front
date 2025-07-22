import Button from "@/components/Button";
import Modal from "@/components/Modal";
import RoomList from "@/pages/Home/RoomList";

import theme from "@/tools/theme";

import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

interface CreateRoomParams {
  wasSimilarRoomsModalOpen: boolean;
}

interface SimilarRoomsModalProps {
  isOpen: boolean;
  onChangeIsOpen: (isOpen: boolean) => void;
  rooms: any[];
  createNewRoom: (params: CreateRoomParams) => void;
}

const styleTitle = {
  ...theme.font18,
  display: "flex",
  alignItems: "center",
  margin: "0 0 12px",
};
const styleButton = {
  width: "100%",
  height: "35px",
  ...theme.font14_bold,
  ...theme.cursor(),
  textAlign: "center" as const,
  borderRadius: "6px",
  backgroundColor: theme.purple,
  color: theme.white,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const styleIcon = {
  fontSize: "21px",
  margin: "0 4px 0 0",
};

const ModalSimilarRooms = (
  { isOpen, onChangeIsOpen, rooms, createNewRoom }: SimilarRoomsModalProps
) => {
  return (
    <Modal
      isOpen={isOpen}
      onChangeIsOpen={() => onChangeIsOpen(false)}
      padding="16px 12px 12px"
    >
      <div css={styleTitle}>
        {" "}
        <ShareRoundedIcon style={styleIcon} />
        유사한 방이 있습니다
      </div>
      <RoomList rooms={rooms} initialLoad={false} />
      <Button
        css={styleButton}
        onClick={() => {
          onChangeIsOpen(false);
          createNewRoom({ wasSimilarRoomsModalOpen: true });
        }}
      >
        그냥 방 만들기
      </Button>
    </Modal>
  );
};

export default ModalSimilarRooms;
