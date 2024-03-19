import { useCallback, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { deviceType } from "@/tools/loadenv";
import { sendAuthLogoutEventToFlutter } from "@/tools/sendEventToFlutter";

type LinkLogoutProps = {
  children: React.ReactNode;
  redirect?: string;
};

export const useOnClickLogout = (redirect?: string) => {
  const history = useHistory();
  const { pathname, search } = useLocation();
  const redirectPath = redirect || pathname + search;
  const isClicked = useRef(false);

  return useCallback(async () => {
    if (isClicked.current) return;
    isClicked.current = true;
    if (deviceType.startsWith("app/")) await sendAuthLogoutEventToFlutter();
    history.replace(`/logout?redirect=${encodeURIComponent(redirectPath)}`);
    isClicked.current = false;
  }, [history, redirectPath]);
};

const LinkLogout = ({ children, redirect }: LinkLogoutProps) => {
  const onClickLogout = useOnClickLogout(redirect);
  return <div onClick={onClickLogout}>{children}</div>;
};

export default LinkLogout;
