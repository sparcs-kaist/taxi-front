import theme from "@/tools/theme";

type BodyAccountCancelProcessProps = {
  roomCompleted: boolean;
};

const BodyAccountCancelProcess = ({
  roomCompleted,
}: BodyAccountCancelProcessProps) => {
  const isCancelAvailable = roomCompleted;
  // 탈퇴 불가 조건이 추가되면 props 부분 손보고, 최종 조건을 여기에 반영해 주세요

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
        지금까지 Taxi 서비스를 이용해 주셔서 감사합니다. <br />
        탈퇴 후에는 복구가 어려우며, &&&&(정해야 함)&&&& 같은 아이디로 다시
        가입이 불가능하오니, 탈퇴 전에 해야 하는 일이 있다면 반드시 확인해
        주시기를 바랍니다.
        <br />
        개인정보 처리 방침에 따라, 개인정보는 탈퇴 후 &&&&(정해야 함)&&&& 5년간
        보관 후 삭제됩니다.
      </div>
      {!isCancelAvailable && (
        <>
          <div style={styleSection}>
            아래의 사항을 확인하신 후에 탈퇴가 가능합니다.
          </div>
          {!roomCompleted && (
            <div style={styleContent}>
              - 참여 중인 모든 방에 대하여 정산 또는 송금을 완료해 주세요.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BodyAccountCancelProcess;
