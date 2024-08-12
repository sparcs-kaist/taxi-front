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
      <div style={styleContent}>탈퇴 관련 안내 사항</div>
      <div style={styleSection}>탈퇴가 불가능한 경우 뜨는 섹션</div>
      <div style={styleContent}>
        - 탈퇴 불가능 사유
        <br />- 나열하기
      </div>
    </div>
  );
};

export default BodyAccountCancelProcess;
