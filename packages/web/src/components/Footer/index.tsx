import { ReactNode, memo, useCallback, useState } from "react";
import { Link } from "react-router-dom";

import { ModalCredit, ModalPrivacyPolicy } from "@/components/ModalPopup";

import ButtonAboveFooter from "./ButtonAboveFooter";

import { ReactComponent as SparcsLogo } from "@/static/assets/sparcsLogos/SparcsLogoWithText.svg";

type FooterProps = {
  type?: "only-logo" | "full" | "event-2023fall";
  children?: ReactNode;
};

const Footer = ({ type = "full", children }: FooterProps) => {
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
      {children}
      {type === "full" && (
        <>
          <ModalPrivacyPolicy
            isOpen={isOpenPrivacyPolicy}
            onChangeIsOpen={setIsOpenPrivacyPolicy}
          />
          <ModalCredit isOpen={isOpenCredit} onChangeIsOpen={setIsOpenCredit} />
          <a className="popup-channeltalk">
            <ButtonAboveFooter text="채널톡 문의하기" />
          </a>
          <ButtonAboveFooter
            text="개인정보 처리방침"
            onClick={onClickPrivacyPolicy}
          />
          <Link to="/event/2023spring-guide" css={{ textDecoration: "none" }}>
            <ButtonAboveFooter text="택시 살펴보기" />
          </Link>
          <ButtonAboveFooter text="만든 사람들" onClick={onClickCredit} />
        </>
      )}
      {type === "event-2023fall" && (
        <>
          <ModalCredit
            defaultSelectedCatagory="2023FallEvent"
            isOpen={isOpenCredit}
            onChangeIsOpen={setIsOpenCredit}
          />
          <ButtonAboveFooter
            text="한가위 송편 이벤트를 만든 사람들"
            onClick={onClickCredit}
          />
          <Link to="/event/2023spring-guide" css={{ textDecoration: "none" }}>
            <ButtonAboveFooter text="택시 살펴보기" />
          </Link>
          <a className="popup-channeltalk">
            <ButtonAboveFooter text="채널톡 문의하기" />
          </a>
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
