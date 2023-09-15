import { useCallback } from "react";

import alertAtom from "atoms/alert";
import { useSetRecoilState } from "recoil";

import { deviceType } from "tools/loadenv";
import { sendClipboardCopyEventToFlutter } from "tools/sendEventToFlutter";

type LinkCopyProps = {
  children: React.ReactNode;
  value: string;
  onCopy?: (value: string) => void;
};

const LinkCopy = ({ children, value, onCopy }: LinkCopyProps) => {
  const setAlert = useSetRecoilState(alertAtom);
  const onClick = useCallback(() => {
    if (deviceType.startsWith("app/")) sendClipboardCopyEventToFlutter(value);
    if (!navigator.clipboard) {
      setAlert("복사를 지원하지 않는 브라우저입니다.");
      return;
    }
    navigator.clipboard.writeText(value);
    onCopy?.(value);
  }, [value, onCopy]);
  return <a onClick={onClick}>{children}</a>;
};

export default LinkCopy;
