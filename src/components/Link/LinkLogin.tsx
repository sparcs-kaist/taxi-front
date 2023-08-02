import { useLocation } from "react-router-dom";

import isAppAtom from "atoms/isApp";
import { useRecoilValue } from "recoil";

import { backServer } from "tools/loadenv";

type LinkLoginProps = {
  children: React.ReactNode;
  redirect?: string;
};

const LinkLogin = ({ children, redirect }: LinkLoginProps) => {
  const { pathname, search } = useLocation();
  const isApp = useRecoilValue(isAppAtom);
  const redirectPath = redirect || pathname + search;

  return (
    <a
      href={`${backServer}/auth/sparcssso?redirect=${encodeURIComponent(
        redirectPath
      )}${isApp ? "&isApp=true" : ""}`}
      css={{ textDecoration: "none" }}
    >
      {children}
    </a>
  );
};

export default LinkLogin;
