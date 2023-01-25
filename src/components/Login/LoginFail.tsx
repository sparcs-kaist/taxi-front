import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import errorAtom from "recoil/error";

const LoginFail = () => {
  const setError = useSetRecoilState(errorAtom);

  useEffect(() => {
    setError({
      title: "Taxi에 로그인 하는 중에 문제가 발생하였습니다.",
      message: (
        <>
          아래와 같은 원인에 의해 문제가 발생했을 수 있습니다.
          <br />
          - SPARCS SSO에 facebook 계정으로 로그인 하였음
          <br />
          - &lt;카이스트 통합인증으로 로그인&gt;에서 학사,석사,박사 또는
          교수님이 아닌 계정으로 로그인 하였음
          <br />
          - 로그인 과정이 지연되어서 토큰이 만료됨
          <br />
          <br />
          로그인 재시도 혹은 다른 계정으로 로그인 해주세요.
          <br />
          오른쪽 하단의 채널톡 버튼을 눌러 문의 부탁드립니다.
        </>
      ),
      record: null,
    });
  }, []);

  return null;
};

export default LoginFail;
