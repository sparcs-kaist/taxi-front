import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import loginInfoDetailAtom from "recoil/loginInfoDetail";
import PropTypes from "prop-types";
import Modal from "components/common/modal/Modal";
import DottedLine from "components/common/DottedLine";
import theme from "styles/theme";
import Button from "components/common/Button";
import bankNames from "static/bankNames";

type AccountSelectorProps = {
  account: string;
  setAccount: (account: string) => void;
};

const AccountSelector = (props: AccountSelectorProps) => {
  const regexAccountNumber = new RegExp("^[A-Za-z가-힣]{2,7} [0-9]{10,14}$");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankNumber, setBankNumber] = useState("");
  const [bankName, setBankName] = useState(bankNames[0]);

  useEffect(() => {
    setAccountNumber(bankName + " " + bankNumber);
  }, [bankName, bankNumber]);

  const styleTitle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    ...theme.font14,
    color: theme.gray_text,
    whiteSpace: "nowrap",
  };
  const styleNickname: React.CSSProperties = {
    width: "100%",
    ...theme.font14,
    border: "none",
    outline: "none",
    borderRadius: "6px",
    padding: "6px 12px",
    marginLeft: "10px",
    background: theme.purple_light,
    boxShadow: theme.shadow_purple_input_inset,
  };
  const styleBanks: React.CSSProperties = {
    width: "75px",
    ...theme.font14,
    color: theme.purple,
    fontWeight: "400",
    border: "none",
    outline: "none",
    borderRadius: "6px",
    padding: "6px 4px",
    marginLeft: "10px",
    background: theme.purple_light,
    boxShadow: theme.shadow_purple_input_inset,
    textAlign: "center",
  };

  return (
    <div style={{ ...styleTitle, marginTop: "10px" } as React.CSSProperties}>
      계좌
      <select
        style={styleBanks}
        value={bankName}
        onChange={(e) => {
          setBankName(e.target.value);
        }}
      >
        {bankNames.map((option) => {
          return (
            <option value={option} key={option}>
              {option}
            </option>
          );
        })}
      </select>
      <input
        style={styleNickname}
        value={bankNumber}
        onChange={(e) => setBankNumber(e.target.value)}
      />
    </div>
  );
};
AccountSelector.propTypes = {
  profToken: PropTypes.any,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default AccountSelector;
