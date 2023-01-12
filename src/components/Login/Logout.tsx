import React, { useState, useRef, useEffect } from "react";
import useTaxiAPI from "hooks/useTaxiAPI";
import { useHistory } from "react-router";

const Logout = () => {
  const [error, response, isLodding] = useTaxiAPI.get("/auth/logout");
  const history = useHistory();

  useEffect(() => {
    if (error) {
      /**
       * @todo @fixme
       * 로그아웃 에러 처리 어떻게 할지 고민하기
       */
    }
    else if (!isLodding && response) {
      /**
       * @todo @fixme
       * 글로벌 변수 초기화 필요
       */
      history.push("/login");
    }
  }, [error, response]);

  return null;
}

export default Logout;
