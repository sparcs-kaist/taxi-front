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
      <div style={styleContent}>(탈퇴 관련 안내 사항)</div>
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
