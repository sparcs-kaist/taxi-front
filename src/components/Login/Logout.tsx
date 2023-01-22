import React, { useEffect } from "react";
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
      window.location.href = response?.ssoLogoutUrl;
    }
  }, [error, response, isLoading]);

  return null;
};

export default Logout;
