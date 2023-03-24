import { useEffect, useState } from "react";

import regExpTest from "tools/regExpTest";
import theme from "tools/theme";

import bankNames from "static/bankNames";

type AccountSelectorProps = {
  accountNumber: string;
  setAccountNumber: (account: string) => void;
};

const AccountSelector = (props: AccountSelectorProps) => {
  const [bankNumber, setBankNumber] = useState("");
  const [bankName, setBankName] = useState(bankNames[0]);

  useEffect(() => {
    props.setAccountNumber(bankName + " " + bankNumber);
  }, [bankName, bankNumber]);

  useEffect(() => {
    if (regExpTest.accountNumber(props.accountNumber)) {
      const account = props.accountNumber.split(" ");
      setBankName(account[0]);
      setBankNumber(account[1]);
    }
  }, [props.accountNumber]);

  const styleTitle: CSS = {
    display: "flex",
    alignItems: "center",
    ...theme.font14,
    color: theme.gray_text,
    whiteSpace: "nowrap",
    marginTop: "10px",
  };
  const styleNickname: CSS = {
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
  const styleBanks: CSS = {
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
  const styleDisabledAccount: CSS = {
    marginLeft: "10px",
  };
  const styleDisabledBank: CSS = {
    marginLeft: "10px",
    color: theme.purple,
  };
  return (
    <div style={styleTitle}>
      계좌
      <select
        style={styleBanks}
        value={bankName}
        onChange={(e) => {
          setBankName(e.target.value);
        }}
      >
        {bankNames.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
      <input
        style={styleNickname}
        value={bankNumber}
        onChange={(e) => setBankNumber(e.target.value)}
      />
    </div>
  );
};

export default AccountSelector;
