import { useEffect } from "react";
import useTaxiAPI from "hooks/useTaxiAPI";

const Logout = () => {
  const [error, response, isLoading] = useTaxiAPI.get("/auth/logout");

  useEffect(() => {
    if (error) {
      /**
       * @todo @fixme
       * 로그아웃 에러 처리 어떻게 할지 고민하기
       */
    } else if (!isLoading && response?.ssoLogoutUrl) {
      // response?.ssoLogoutUrl = SSO로그아웃과 함께 다시 taxi-front로 redirect해주는 URL
      // "/auth/logout" API 명세서 참고
      window.location.href = response?.ssoLogoutUrl;
    }
  }, [error, response, isLoading]);

  return null;
};

export default Logout;
