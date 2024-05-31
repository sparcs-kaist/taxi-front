import theme from "@/tools/theme";

const BodyAccountCancelProcess = () => {
  const styleBox = {
    padding: "0 24px 0 16px",
    borderRadius: "10px",
    overflow: "auto",
    minHeight: "270px",
    height: "calc(100vh - 360px)",
    background: theme.gray_background,
    boxShadow: theme.shadow_gray_button_inset,
  };
  const styleSection = {
    ...theme.font14_bold,
    margin: "16px 0",
  };
  const styleContent = {
    ...theme.font14,
    lineHeight: "20px",
    marginLeft: "8px",
  };
  return (
    <div style={styleBox}>
      <div style={styleSection} />
      <div style={styleContent}>
        Taxi 서비스의 회원 탈퇴 절차는 다음과 같습니다.
      </div>
      <div style={styleSection}>1. 탈퇴 방법</div>
      <div style={styleContent}>
        현재 Taxi 서비스는 자동화된 회원 탈퇴 기능을 제공하고 있지 않습니다.
        대신, '회원 탈퇴하기'를 통해 회원 탈퇴 의사를 밝혀주시면, Taxi팀이
        확인한 뒤 탈퇴를 처리해 드립니다. 정산이 완료되지 않은 방이 존재하는
        경우, 정산이 완료될 때까지 탈퇴가 불가능합니다.
      </div>
      <div style={styleSection}>2. 탈퇴 처리 절차</div>
      <div style={styleContent}>
        유효한 회원 탈퇴 요청이 접수되면, Taxi팀이 해당 요청을 확인한 날을
        시점으로 14일간 유예 기간이 부여됩니다. 유예 기간이 지난 후에는 이름,
        학번, 이메일 주소, 계좌번호 등 개인정보가 즉시 삭제됩니다. 유예 기간을
        부여하는 이유는, 실제로 정산이 완료되지 않았음에도 Taxi 서비스 내의 정산
        관련 기능을 사용한 상황에서의 탈퇴를 방지하기 위함입니다.
      </div>
      <div style={styleSection}>3. 삭제되지 않는 데이터</div>
      <div style={styleContent}>
        1. 채팅, 생성한 방, 참여한 방에 대한 데이터는 삭제되지 않습니다. 단,
        이름 등의 개인정보는 모두 삭제되기 때문에 해당 데이터와 탈퇴한 사용자를
        연결 짓는 것은 불가능합니다.
        <br />
        2. Taxi 서비스를 탈퇴하더라도 SPARCS SSO 계정은 그대로 유지됩니다.
        SPARCS SSO 계정 탈퇴가 필요하신 경우, SPARCS SSO를 통해 탈퇴를 진행해
        주십시오.
      </div>
    </div>
  );
};

export default BodyAccountCancelProcess;
