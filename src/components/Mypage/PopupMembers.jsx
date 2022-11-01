import React from "react";
import PropTypes from "prop-types";
import DottedLine from "components/common/DottedLine";
import { theme } from "styles/theme";
import Modal from "components/common/modal/Modal";
import members from "static/members";

import { ReactComponent as SparcsLogoBlack } from "static/assets/SparcsLogoBlack.svg";
import { ReactComponent as SparcsLogoYellow } from "static/assets/SparcsLogoYellow.svg";

const Member = (props) => {
  const styleBox = {
    background: theme.purple_light,
    borderRadius: "10px",
    padding: "16px 12px 12px",
    boxShadow: theme.shadow,
    display: "flex",
    flexDirection: "column",
  };
  const styleRow = {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
  };
  const styleName = {
    ...theme.font14_bold,
    whiteSpace: "nowrap",
  };
  const styleLogo = {
    height: "18px",
    paddingLeft: "8px",
    paddingRight: "4px",
  };
  const styleNickname = {
    ...theme.font12,
    color: theme.yellow,
    fontWeight: "bold",
  };
  const stylePeriod = {
    ...theme.font10_bold,
    color: theme.gray_text,
  };

  return (
    <div style={styleBox}>
      <div style={styleRow}>
        <div style={styleName}>{props.name}</div>
        <SparcsLogoYellow style={styleLogo} alt="sparcs" />
        <div style={styleNickname}>{props.id}</div>
      </div>
      <div style={stylePeriod}>{props.period}</div>
    </div>
  );
};
Member.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  period: PropTypes.string,
};

const PopupMembers = (props) => {
  const styleTitle = {
    ...theme.font18,
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
  };
  const styleLogo = {
    height: "21px",
    width: "auto",
    margin: "0 8px",
  };
  const styleContainer = {
    overflow: "auto",
    paddingTop: "12px",
    minHeight: "270px",
    height: "calc(100vh - 360px)",
    maskImage:
      "linear-gradient(to bottom, transparent, white 16px, white calc(100% - 16px), transparent 100%)",
  };
  const styleRole = {
    ...theme.font14_bold,
    padding: "0 0 12px 12px",
  };
  const styleMemberContainer = {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    paddingBottom: "12px",
  };
  return (
    <Modal
      display={props.isOpen}
      onClickClose={props.onClose}
      padding="16px 12px 12px"
      width={755}
    >
      <div style={styleTitle}>
        <SparcsLogoBlack style={styleLogo} />
        만든 사람들
      </div>
      <DottedLine direction="row" />
      <div style={styleContainer}>
        {members.map((item) => {
          return (
            <div key={item.position}>
              <div style={styleRole}>{item.position}</div>
              <div style={styleMemberContainer}>
                {item.list.map((member) => (
                  <Member
                    name={member.name}
                    id={member.id}
                    period={member.period}
                    key={member.id}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <DottedLine direction="row" />
    </Modal>
  );
};
PopupMembers.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default PopupMembers;
