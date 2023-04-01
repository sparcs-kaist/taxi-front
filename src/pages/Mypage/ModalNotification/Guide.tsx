import theme from "tools/theme";

const Guide = () => {
  const styleGuide = {
    ...theme.font12,
    color: theme.gray_text,
    marginBottom: "12px",
    wordBreak: "keep-all" as any,
  };
  return (
    <>
      <div css={styleGuide}>알림 기능을 사용할 수 없습니다.</div>
      <div css={styleGuide}>
        웹 푸시 알림 기능을 활성화하기 위해서는, 사용하는 브라우저별 알림 권한
        허용이 필요합니다.
      </div>
      <div css={styleGuide}>
        Chrome에서 브라우저 알림 허용하기
        <br />
        1. 더보기 {">"} 설정 {">"} 개인정보 및 보안 {">"} 사이트 설정 {">"}{" "}
        [taxi.sparcs.org]을 선택합니다.
        <br />
        2. 권한 {"'"}알림{"'"} 설정을 허용으로 변경합니다.
      </div>
      <div css={styleGuide}>
        Edge에서 브라우저 알림 허용하기
        <br />
        1. 더보기 {">"} 설정 {">"} 쿠키 및 사이트 권한 {">"} [알림]을
        선택합니다.
        <br />
        2. {"'"}허용{"'"}의 {"'"}추가{"'"} 버튼을 선택합니다.
        <br />
        3. {"'"}사이트 추가{"'"} 창에 https://taxi.sparcs.org/를 입력하고 {"'"}
        추가{"'"} 버튼을 선택합니다.
      </div>
      <div css={styleGuide}>
        이 외의 브라우저 역시, 해당 브라우저 환경 설정에서 유사한 방법으로
        알림을 허용할 수 있습니다. 혹은, 웹 푸시 알림 기능을 지원하지 않는
        브라우저일 수 있습니다.
      </div>
    </>
  );
};

export default Guide;
