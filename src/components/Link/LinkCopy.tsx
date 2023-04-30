import { useCallback } from "react";

import alertAtom from "atoms/alert";
import isAppAtom from "atoms/isApp";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { sendClipboardCopyEventToFlutter } from "tools/sendEventToFlutter";

type LinkCopyProps = {
  children: React.ReactNode;
  value: string;
  onCopy?: (value: string) => void;
};

const LinkCopy = ({ children, value, onCopy }: LinkCopyProps) => {
  const setAlert = useSetRecoilState(alertAtom);
  const isApp = useRecoilValue(isAppAtom);

  const onClick = useCallback(() => {
    if (isApp) sendClipboardCopyEventToFlutter(value);
    if (!navigator.clipboard) {
      setAlert("복사를 지원하지 않는 브라우저입니다.");
      return;
    }
    navigator.clipboard.writeText(value);
    if (onCopy) onCopy(value);
  }, [isApp, value, setAlert, onCopy]);
  return <a onClick={onClick}>{children}</a>;
};

export default LinkCopy;
