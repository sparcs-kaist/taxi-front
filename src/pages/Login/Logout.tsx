import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

import { useQuery } from "hooks/useTaxiAPI";

import errorAtom from "atoms/error";
import { useSetRecoilState } from "recoil";

const Logout = () => {
  const { search } = useLocation();
  const redirectPath =
    useMemo(() => {
      const searchParams = new URLSearchParams(search);
      return searchParams.get("redirect");
    }, [search]) || "/";

  const [error, response, isLoading] = useQuery.get(
    `/auth/logout?redirect=${redirectPath}`
  );
  const setError = useSetRecoilState(errorAtom);

  useEffect(() => {
    if (error) {
      setError({
        title: "일시적인 서버 오류",
        message: "로그아웃에 실패했습니다.",
        record: null,
      });
    } else if (!isLoading && response?.ssoLogoutUrl) {
      // response?.ssoLogoutUrl = SSO로그아웃과 함께 다시 taxi-front로 redirect해주는 URL
      // "/auth/logout" API 명세서 참고
      window.location.href = response?.ssoLogoutUrl || "/login";
    }
  }, [error, response, isLoading]);

  return null;
};

export default Logout;
