import { ReactNode, useMemo } from "react";

import LinkCopy from "./LinkCopy";

type LinkPaymentProps = {
  children: ReactNode;
  type: "kakaopay" | "toss";
  account?: string;
  amount?: number;
};

const bankName2Code = (name: Nullable<string>): Nullable<string> => {
  if (!name) return undefined;
  const bankName2CodeMap = new Map([
    ["농협", "011"],
    ["국민", "004"],
    ["카카오", "090"],
    ["신한", "088"],
    ["우리", "020"],
    ["기업", "003"],
    ["하나", "081"],
    ["토스", "092"],
    ["새마을", "045"],
    ["부산", "032"],
    ["대구", "031"],
    ["케이", "089"],
    ["신협", "048"],
    ["우체국", "071"],
    ["SC제일", "023"],
    ["경남", "039"],
    ["수협", "007"],
    ["광주", "034"],
    ["전북", "037"],
    ["저축", "050"],
    ["씨티", "027"],
    ["제주", "035"],
    ["산업", "002"],
    ["산림", "064"],
  ]);
  return bankName2CodeMap.get(name);
};

const LinkPayment = ({ children, account, type, amount }: LinkPaymentProps) => {
  const splited = account?.split(" ");
  const bankName = splited?.[0];
  const bankCode = useMemo(() => bankName2Code(bankName), [bankName]);
  const accountNumber = splited?.[1];

  switch (type) {
    case "kakaopay":
      return (
        <LinkCopy
          value={account || ""}
          onCopy={() => {
            window.location.href = "kakaotalk://kakaopay/money/to/bank";
          }}
        >
          {children}
        </LinkCopy>
      );
    case "toss":
      return (
        <a
          href={`supertoss://send?amount=${
            amount || ""
          }&title=Taxi 송금&bankCode=${bankCode || ""}&accountNo=${
            accountNumber || ""
          }`}
          css={{ textDecoration: "none" }}
        >
          {children}
        </a>
      );
  }
};

export default LinkPayment;
