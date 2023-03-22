import { useEffect, useState } from "react";
import theme from "styles/theme";
import bankNames from "static/bankNames";

type AccountSelectorProps = {
  accountNumber: string;
  setAccountNumber: (account: string) => void;
  disabled?: boolean;
};

const AccountSelector = (props: AccountSelectorProps) => {
  const [bankNumber, setBankNumber] = useState("");
  const [bankName, setBankName] = useState(bankNames[0]);
  const regexAccountNumber = new RegExp("^[A-Za-z가-힣]{2,7} [0-9]{10,14}$");

  useEffect(() => {
    props.setAccountNumber(bankName + " " + bankNumber);
  }, [bankName, bankNumber]);

  useEffect(() => {
    if (regexAccountNumber.test(props.accountNumber)) {
      const account = props.accountNumber.split(" ");
      setBankName(account[0]);
      setBankNumber(account[1]);
    }
  }, [props.accountNumber]);

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
  const styleDisabledAccount: React.CSSProperties = {
    marginLeft: "10px",
  };
  const styleDisabledBank: React.CSSProperties = {
    marginLeft: "10px",
    color: theme.purple,
  };
  return (
    <div style={{ ...styleTitle, marginTop: "10px" } as React.CSSProperties}>
      계좌
      {props.disabled ? (
        <div style={styleDisabledBank}>{bankName}</div>
      ) : (
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
      )}
      {props.disabled ? (
        <div style={styleDisabledAccount}>{bankNumber}</div>
      ) : (
        <input
          style={styleNickname}
          value={bankNumber}
          onChange={(e) => setBankNumber(e.target.value)}
        />
      )}
    </div>
  );
};

export default AccountSelector;
