import Modal from "@/components/Modal";

import BodyFavoriteRoute from "./Body/BodyFavoriteRoute";

import theme from "@/tools/theme";

import { ReactComponent as TaxiLogo } from "@/static/assets/sparcsLogos/TaxiLogo.svg";

type PopupFavoriteRouteProps = {
  isOpen: boolean;
  onChangeIsOpen: (isOpen: boolean) => void;
};

const ModalFavoriteRoute = ({
  isOpen,
  onChangeIsOpen,
}: PopupFavoriteRouteProps) => {
  const styleTop: CSS = {
    display: "flex",
    alignItems: "center",
    margin: "8px 0 16px 8px",
    ...theme.font16_bold,
    columnGap: "8px",
  };

  return (
    <Modal
      isOpen={isOpen}
      onChangeIsOpen={onChangeIsOpen}
      width={theme.modal_width_large}
      padding="16px 12px 12px"
    >
      <div style={styleTop}>
        <TaxiLogo style={{ height: "27px" }} />
        즐겨찾는 경로
      </div>
      <BodyFavoriteRoute />
    </Modal>
  );
};

export default ModalFavoriteRoute;
