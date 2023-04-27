import { useLocation } from "react-router-dom";

import { isWebViewInFlutter } from "tools/sendEventToFlutter";

import { backServer } from "loadenv";

type LinkLoginProps = {
  children: React.ReactNode;
  redirect?: string;
};

const LinkLogin = ({ children, redirect }: LinkLoginProps) => {
  const { pathname, search } = useLocation();
  const redirectPath = redirect || pathname + search;
  const isApp = isWebViewInFlutter();

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
