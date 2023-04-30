import { useCallback } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";

import Button from "components/Button";
import DottedLine from "components/DottedLine";
import Modal from "components/Modal";

import theme from "tools/theme";
import { getDynamicLink } from "tools/trans";

type ModalSuggestAppProps = {
  isOpen: boolean;
  onChangeIsOpen: (isOpen: boolean) => void;
};

const ModalSuggestApp = ({ isOpen, onChangeIsOpen }: ModalSuggestAppProps) => {
  const { pathname, search } = useLocation();
  const currentPath = pathname + search;

  const [, setCookies] = useCookies(["isOpposeSuggestApp"]);

  const onOppose = useCallback(() => {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 10);
    setCookies("isOpposeSuggestApp", true, { expires: expirationDate });
    onChangeIsOpen(false);
  }, [setCookies, onChangeIsOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onChangeIsOpen={onChangeIsOpen}
      padding="16px 12px 12px"
    >
      <div
        css={{
          ...theme.font18,
          alignItems: "center",
          margin: "0 8px 12px",
        }}
      >
        Taxi, 앱으로 만나보세요!
      </div>
      <DottedLine />
      <div
        css={{
          ...theme.font14,
          margin: "12px 8px",
          wordBreak: "keep-all" as any,
        }}
      >
        <b css={{ color: theme.purple }}>Taxi for KAIST</b> 앱에서{" "}
        <b>푸시 알림 기능</b>과 <b>채팅</b>을 더 편리하게 이용할 수 있습니다.
      </div>
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="gray"
          width="calc(40% - 10px)"
          padding="10px 0 9px"
          radius={8}
          font={theme.font14}
          onClick={onOppose}
        >
          웹으로 계속
        </Button>
        <a
          href={getDynamicLink(currentPath, false)}
          target="_blank"
          rel="noreferrer"
          css={{ textDecoration: "none", width: "60%" }}
        >
          <Button
            type="purple"
            padding="10px 0 9px"
            radius={8}
            font={theme.font14_bold}
          >
            앱으로 접속하기
          </Button>
        </a>
      </div>
    </Modal>
  );
};

export default ModalSuggestApp;
