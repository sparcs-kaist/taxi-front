import React, { useState, useRef, useEffect } from "react";
import useTaxiAPI from "hooks/useTaxiAPI";
import { useHistory } from "react-router";

const Logout = () => {
  const [error, response, isLoading] = useTaxiAPI.get("/auth/logout");
  const history = useHistory();

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
