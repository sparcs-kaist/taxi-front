import Modal from "components/Modal";

import theme from "tools/theme";

import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";

type Modal2023FallEventRandomBoxProps = Parameters<typeof Modal>[0] & {};

const Modal2023FallEventRandomBox = ({
  ...modalProps
}: Modal2023FallEventRandomBoxProps) => {
  const onClickOk = () => {};

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
    <Modal padding="16px 12px 12px" onEnter={onClickOk} {...modalProps}>
      <div css={styleTitle}>
        <LocalAtmRoundedIcon style={styleIcon} />
        랜덤박스 열기
      </div>
    </Modal>
  );
};

export default Modal2023FallEventRandomBox;
