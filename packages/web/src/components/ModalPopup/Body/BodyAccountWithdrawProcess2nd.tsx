import theme from "@/tools/theme";

const BodyAccountWithdrawProcess2nd = () => {
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
      <div style={styleSection}>정말 탈퇴하시겠습니까?</div>
      <div style={styleContent}>탈퇴 후에는 복구가 어렵습니다.</div>
    </div>
  );
};

export default BodyAccountWithdrawProcess2nd;
