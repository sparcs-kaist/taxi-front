import { useCallback, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";

type LinkLogoutProps = {
  children: React.ReactNode;
  redirect?: string;
};

const LinkLogout = ({ children, redirect }: LinkLogoutProps) => {
  const history = useHistory();
  const { pathname, search } = useLocation();
  const redirectPath = redirect || pathname + search;
  const isClicked = useRef(false);

  const onClickLogout = useCallback(async () => {
    if (isClicked.current) return;
    isClicked.current = true;
    history.replace(`/logout?redirect=${encodeURIComponent(redirectPath)}`);
    isClicked.current = false;
  }, [history, redirectPath]);

  return <div onClick={onClickLogout}>{children}</div>;
};

export default LinkLogout;
