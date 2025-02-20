import theme from "@/tools/theme";

type BodyAccountWithdrawProcessProps = {
  roomCompleted: boolean;
};

const BodyAccountWithdrawProcess = ({
  roomCompleted,
}: BodyAccountWithdrawProcessProps) => {
  const isCancelAvailable = roomCompleted;
  // TODO : 탈퇴 불가 조건이 추가되면 props 부분 손보고, 최종 조건을 여기에 반영해 주세요

  const styleBox = {
    padding: "0 24px 0 16px",
    borderRadius: "10px",
    overflow: "auto",
    minHeight: "270px",
    maxHeight: "calc(100vh - 360px)",
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
      <div style={styleSection}>
        지금까지 Taxi 서비스를 이용해 주셔서 감사합니다.
      </div>
      <div style={styleContent}>
        •&nbsp; 탈퇴 후에는 복구가 어려우며, 탈퇴 후 7일간 재가입이
        불가능합니다. 탈퇴 전에 해야 하는 일이 있다면 반드시 확인해 주시기를
        바랍니다. <br />
        •&nbsp; 참여했던 방의 채팅 내역 등에서 탈퇴 후에도 현재의 닉네임이
        표시됩니다. 변경이 필요하실 경우 탈퇴 전에 변경해 주세요.
        <br />
        •&nbsp; 향후 발생할 수 있는 분쟁 해결을 위해 개인정보는 탈퇴 후 5년까지
        보존됩니다.
      </div>
      {!isCancelAvailable && (
        <>
          <div style={styleSection}>
            아래의 사항을 확인하신 후에 탈퇴가 가능합니다.
          </div>
          {!roomCompleted && (
            <div style={styleContent}>
              •&nbsp; 참여 중인 모든 방에 대하여 정산 또는 송금을 완료해 주세요.
              아직 출발하지 않은 방의 경우, 탑승을 취소해 주세요.
            </div>
          )}
        </>
      )}
      <br />
    </div>
  );
};

export default BodyAccountWithdrawProcess;
