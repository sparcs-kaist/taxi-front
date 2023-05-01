import { memo, useCallback, useState } from "react";

import { ModalCredit, ModalPrivacyPolicy } from "./ModalPopup";

import theme from "tools/theme";

import { ReactComponent as SparcsLogo } from "static/assets/SparcsLogoWithText.svg";

type BtnFooterProps = {
  text: string;
  onClick?: () => void;
};

type FooterProps = {
  type?: "only-logo" | "full";
};

const BtnFooter = ({ text, onClick }: BtnFooterProps) => {
  return (
    <div css={{ ...theme.font12, padding: "6px" }}>
      <a
        onClick={onClick}
        style={{
          textDecoration: "none",
          color: theme.gray_text,
          ...theme.cursor(),
        }}
      >
        {text}
      </a>
    </div>
  );
};

const Footer = ({ type = "full" }: FooterProps) => {
  const [isOpenPrivacyPolicy, setIsOpenPrivacyPolicy] = useState(false);
  const [isOpenCredit, setIsOpenCredit] = useState(false);

  const onClickPrivacyPolicy = useCallback(
    () => setIsOpenPrivacyPolicy(true),
    [setIsOpenPrivacyPolicy]
  );
  const onClickCredit = useCallback(
    () => setIsOpenCredit(true),
    [setIsOpenCredit]
  );

  return (
    <div
      css={{
        paddingTop: "45px",
        textAlign: "center",
      }}
    >
      {type === "full" && (
        <>
          <ModalPrivacyPolicy
            isOpen={isOpenPrivacyPolicy}
            onChangeIsOpen={setIsOpenPrivacyPolicy}
          />
          <ModalCredit isOpen={isOpenCredit} onChangeIsOpen={setIsOpenCredit} />
          <a className="popup-channeltalk">
            <BtnFooter text="채널톡 문의하기" />
          </a>
          <BtnFooter text="개인정보 처리방침" onClick={onClickPrivacyPolicy} />
          <BtnFooter text="만든 사람들" onClick={onClickCredit} />
        </>
      )}
      <div css={{ padding: "6px" }}>
        <a href="https://sparcs.org/" target="_blank" rel="noreferrer">
          <SparcsLogo style={{ height: "27px", opacity: 0.632 }} />
        </a>
      </div>
    </div>
  );
};

export default memo(Footer);
