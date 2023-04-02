import { useEffect } from "react";

import errorAtom from "atoms/error";
import { useSetRecoilState } from "recoil";

const PageNotFound = () => {
  const setError = useSetRecoilState(errorAtom);

  useEffect(() => {
    setError({
      title: "페이지를 찾을 수 없습니다,",
      message: "요청하신 URL이 올바른지 확인해주세요.",
      record: null,
    });
  }, []);

  return null;
};

export default PageNotFound;
