import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import regExpTest from "tools/regExpTest";
import theme from "tools/theme";

import bankNames from "static/bankNames";

type AccountSelectorProps = {
  accountNumber: string;
  setAccountNumber: (account: string) => void;
};

const AccountSelector = (props: AccountSelectorProps) => {
  const { t } = useTranslation("mypage");
  const [bankNumber, setBankNumber] = useState("");
  const [bankName, setBankName] = useState(bankNames[0]);

  useEffect(() => {
    props.setAccountNumber(bankName + " " + bankNumber);
  }, [bankName, bankNumber]);

  useEffect(() => {
    if (regExpTest.account(props.accountNumber)) {
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
    borderRadius: "6px",
    marginLeft: "10px",
    background: theme.purple_light,
    boxShadow: theme.shadow_purple_input_inset,
    textAlign: "center",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    // justifyContent: "space-between",
  };

  const styleSelector: CSS = {
    ...theme.font14,
    color: theme.purple,
    width: "75px",
    background: "transparent",
    padding: "6px 0 6px 4px",
    boxSizing: "border-box",
    fontWeight: "400",
    border: "none",
    outline: "none",
    textAlign: "center",
    WebkitAppearance: "none",
    MozAppearance: "none",
    appearance: "none",
  };

  const dropdownStyle: CSS = {
    width: "20px",
    height: "20px",
    color: theme.purple,
    position: "relative",
    left: "-10px",
    pointerEvents: "none",
  };
  return (
    <div style={styleTitle}>
      {t("account")}
      <div style={styleBanks}>
        <select
          style={styleSelector}
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
        <ArrowDropDownIcon style={dropdownStyle} />
      </div>

      <input
        style={styleNickname}
        value={bankNumber}
        onChange={(e) => setBankNumber(e.target.value)}
      />
    </div>
  );
};

export default AccountSelector;
