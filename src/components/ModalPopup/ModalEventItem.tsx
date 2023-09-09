import { EventItemProps } from "components/Event/EventItem";
import Modal from "components/Modal";

import BodyEventItem from "./Body/BodyEventItem";

import theme from "tools/theme";

import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";

type ModalEventItemProps = Omit<
  Parameters<typeof Modal>[0],
  "padding" | "children"
> & { itemInfo: EventItemProps };

const ModalEventItem = ({ itemInfo, ...modalProps }: ModalEventItemProps) => {
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
    <Modal {...modalProps} padding="16px 12px 12px" width="242px">
      <div css={styleTitle}>
        <AccountBalanceWalletRoundedIcon style={styleIcon} />
        구매하기
      </div>
      <BodyEventItem
        itemInfo={itemInfo}
        onChangeIsOpen={modalProps.onChangeIsOpen}
      />
    </Modal>
  );
};

export default ModalEventItem;
