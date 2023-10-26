import { backServer, deviceType } from "@/tools/loadenv";
import { useLocation } from "react-router-dom";

type LinkLoginProps = {
  children: React.ReactNode;
  redirect?: string;
};

const LinkLogin = ({ children, redirect }: LinkLoginProps) => {
  const { pathname, search } = useLocation();
  const redirectPath = redirect || pathname + search;

  return (
    <a
      href={`${backServer}/auth/sparcssso?redirect=${encodeURIComponent(
        redirectPath
      )}${deviceType.startsWith("app/") ? "&isApp=true" : ""}`}
      css={{ textDecoration: "none" }}
    >
      {children}
    </a>
  );
};

export default LinkLogin;
