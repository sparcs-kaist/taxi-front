import Button from "@/components/Button";
import DottedLine from "@/components/DottedLine";
import Modal from "@/components/Modal";

import theme from "@/tools/theme";

import WbIncandescentIcon from "@mui/icons-material/WbIncandescent";

type ModalPurchaseSuccessProps = {
  isOpen: boolean;
  onChangeIsOpen?: (isOpen: boolean) => void;
};

const ModalPurchaseSuccess = ({
  isOpen,
  onChangeIsOpen,
}: ModalPurchaseSuccessProps) => {
  const styleTitle = {
    ...theme.font18,
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
  };
  const styleLogo = {
    fontSize: "21px",
    margin: "0 4px 0 0px",
  };
  const styleBody = { display: "grid", rowGap: "12px" };

  return (
    <Modal
      isOpen={isOpen}
      onChangeIsOpen={onChangeIsOpen}
      padding="12px 10px 10px"
    >
      <div css={styleTitle}>
        <WbIncandescentIcon css={styleLogo} />
        응모권 구매에 성공했습니다.
      </div>
      <>
        <div css={styleBody}>
          <DottedLine direction="row" />
          <div
            css={{
              ...theme.font14,
              width: "100%",
              height: "20%",
              textAlign: "center",
              marginTop: "12px",
              marginBottom: "12px",
            }}
          >
            정상적으로 구입되었습니다.
          </div>
          <Button
            css={{
              width: "100%",
              height: "35px",
              ...theme.font16_bold,
              ...theme.cursor(),
              textAlign: "center",
              borderRadius: "6px",
              backgroundColor: theme.purple,
              color: theme.white,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={onChangeIsOpen ? () => onChangeIsOpen(false) : undefined}
          >
            확인
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default ModalPurchaseSuccess;
