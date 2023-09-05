import HeaderBar from "components/HeaderBar";
import Modal from "components/Modal";

import theme from "tools/theme";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

type ModalFullImageProps = Parameters<typeof Modal>[0] & {};

const ModalFullImage = (modalProps: ModalFullImageProps) => {
  return (
    <Modal {...modalProps} displayCloseBtn={false}>
      <div
        css={{
          position: "fixed",
          top: "0px",
          left: "0px",
          width: "100vw",
          height: "100vh",
          background: theme.black,
        }}
      >
        <HeaderBar />
        <div
          css={{
            width: "100%",
            height: "calc(100% - env(safe-area-inset-bottom))",
            position: "relative",
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          <div
            css={{
              width: "100%",
              background: theme.black_40,
              height: "40px",
              padding:
                "calc(max(5px, env(safe-area-inset-top)) + 12px) 20px 12px",
              display: "flex",
              gap: "16px",
              alignItems: "center",
            }}
          >
            <ArrowBackRoundedIcon
              css={{
                color: theme.white,
                fontSize: "24px",
                cursor: "pointer",
                zIndex: theme.zIndex_modal + 1,
              }}
              onClick={() => {
                modalProps.onChangeIsOpen?.(false);
              }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalFullImage;
