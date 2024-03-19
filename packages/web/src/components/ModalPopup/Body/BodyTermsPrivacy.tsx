import { Link } from "react-router-dom";

import theme from "@/tools/theme";

const BodyTermsPrivacy = () => {
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
    <div css={styleBox}>
      <div style={styleSection} />
      <div css={styleContent}>
        1. SPARCS는 개인정보 보호법 제30조에 따라 택시를 이용하는 사용자의
        개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수
        있도록 하기 위하여{" "}
        <Link
          to={(location) => ({
            ...location,
            pathname: location.pathname.startsWith("/mypage")
              ? "/mypage/privacyPolicy"
              : "/home/privacyPolicy",
          })}
          replace
        >
          개인정보 취급방침
        </Link>{" "}
        을 따릅니다.
        <br />
        2. SPARCS는 개인정보보호법 제 15조에 따라 회원의 동의를 받아 회원가입 및
        이용 시 아래와 같이 개인정보가 수집 및 이용되어짐을 안내드립니다.
        <br />- 개인정보의 수집 및 이용 목적 : 홈페이지 회원가입 및 관리
        <br />- 수집 및 이용되는 개인정보의 항목 : 이메일, 이름, 접속 로그, 접속
        IP 정보, 학번
        <br />- 개인정보의 보유 및 이용 기간 : 개인정보 수집.이용 동의일로부터,
        탈퇴일 이후 1년까지
        <br />
        3. 개인정보 수집 및 이용을 거부하실 수 있으나, 이는 서비스 제공에
        필수적으로 제공되어지는 정보이므로, 동의를 거부하실 경우 택시 서비스를
        이용 하실 수 없습니다.
      </div>
      <div css={styleSection}>본 약관은 2023-04-10부터 적용됩니다.</div>
      <div css={styleSection}>
        본인은 위 내용을 충분히 숙지하였으며, 개인정보 수집 및 이용에
        동의합니다.
      </div>
    </div>
  );
};

export default BodyTermsPrivacy;
