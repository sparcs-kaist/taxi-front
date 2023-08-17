import Modal from "components/Modal";

import BodyCallTaxi from "./Body/BodyCallTaxi";
import { BodyRoomShareProps } from "./Body/BodyRoomShare";

import theme from "tools/theme";

import LocalTaxiRoundedIcon from "@mui/icons-material/LocalTaxiRounded";

type ModalCallTaxiProps = {
  isOpen: boolean;
  onChangeIsOpen?: (isOpen: boolean) => void;
  roomInfo: BodyRoomShareProps["roomInfo"];
};

const ModalCallTaxi = ({
  isOpen,
  onChangeIsOpen,
  roomInfo,
}: ModalCallTaxiProps) => {
  const styleTitle = {
    ...theme.font18,
    display: "flex",
    alignItems: "center",
    margin: "0 8px 12px",
  };
  const styleIcon = {
    fontSize: "21px",
    margin: "0 4px 0 0",
  };

  return (
    <Modal
      isOpen={isOpen}
      onChangeIsOpen={onChangeIsOpen}
      padding="16px 12px 12px"
    >
      <div css={styleTitle}>
        <LocalTaxiRoundedIcon style={styleIcon} />
        택시 호출하기
      </div>
      <BodyCallTaxi roomInfo={roomInfo} />
    </Modal>
  );
};

export default ModalCallTaxi;
export { ModalCallTaxi };
