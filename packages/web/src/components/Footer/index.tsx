import { ReactNode, memo, useCallback, useState } from "react";
import { Link } from "react-router-dom";

import { ModalCredit, ModalPrivacyPolicy } from "@/components/ModalPopup";

import ButtonAboveFooter from "./ButtonAboveFooter";

import { ReactComponent as SparcsLogo } from "@/static/assets/sparcsLogos/SparcsLogoWithText.svg";
import { ReactComponent as SparcsLogoWhite } from "@/static/events/2024SparcsLogoWithTextWhite.svg";

type FooterProps = {
  type?:
    | "only-logo"
    | "full"
    | "event-2023fall"
    | "event-2024spring"
    | "event-2024fall";
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
      {type === "event-2024spring" && (
        <>
          <ModalPrivacyPolicy
            isOpen={isOpenPrivacyPolicy}
            onChangeIsOpen={setIsOpenPrivacyPolicy}
          />
          <ModalCredit
            defaultSelectedCatagory="2024SpringEvent"
            isOpen={isOpenCredit}
            onChangeIsOpen={setIsOpenCredit}
          />
          <a className="popup-channeltalk">
            <ButtonAboveFooter text="채널톡 문의하기" />
          </a>
          <ButtonAboveFooter
            text="개인정보 처리방침"
            onClick={onClickPrivacyPolicy}
          />
          <Link to="/event/2024spring-guide" css={{ textDecoration: "none" }}>
            <ButtonAboveFooter text="택시 살펴보기" />
          </Link>
          <ButtonAboveFooter
            text="새터반 택시대제전을 만든 사람들"
            onClick={onClickCredit}
          />
          <div css={{ padding: "6px" }}>
            <a href="https://sparcs.org/" target="_blank" rel="noreferrer">
              <SparcsLogoWhite style={{ height: "27px", opacity: 0.632 }} />
            </a>
          </div>
        </>
      )}
      {type === "event-2024fall" && (
        <>
          <ModalPrivacyPolicy
            isOpen={isOpenPrivacyPolicy}
            onChangeIsOpen={setIsOpenPrivacyPolicy}
          />
          <ModalCredit
            defaultSelectedCatagory="2024FallEvent"
            isOpen={isOpenCredit}
            onChangeIsOpen={setIsOpenCredit}
          />
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
          <ButtonAboveFooter
            text="추석 이벤트를 만든 사람들"
            onClick={onClickCredit}
          />
        </>
      )}
      {type !== "event-2024spring" && (
        <div css={{ padding: "6px" }}>
          <a href="https://sparcs.org/" target="_blank" rel="noreferrer">
            <SparcsLogo style={{ height: "27px", opacity: 0.632 }} />
          </a>
        </div>
      )}
    </div>
  );
};

export default memo(Footer);
