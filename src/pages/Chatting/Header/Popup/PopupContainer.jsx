import Modal from "components/Modal";
import PropTypes from "prop-types";
import Button from "components/Button";
import theme from "tools/theme";

const PopupContainer = (props) => {
  return (
    <Modal
      display={props.popup}
      onClickClose={props.onClickClose}
      padding="10px"
    >
      <div style={{ margin: "26px 0 24px" }}>{props.children}</div>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <Button
          type="gray"
          width="calc(50% - 5px)"
          padding="10px 0 9px"
          radius={8}
          font={theme.font14}
          onClick={props.onClickClose}
        >
          돌아가기
        </Button>
        <Button
          type="purple_inset"
          width="calc(50% - 5px)"
          padding="10px 0 9px"
          radius={8}
          font={theme.font14_bold}
          onClick={props.onClickOk}
        >
          {props.nameOk}
        </Button>
      </div>
    </Modal>
  );
};

PopupContainer.propTypes = {
  popup: PropTypes.bool,
  onClickClose: PropTypes.func,
  onClickOk: PropTypes.func,
  children: PropTypes.node,
  nameOk: PropTypes.string,
};

export default PopupContainer;
