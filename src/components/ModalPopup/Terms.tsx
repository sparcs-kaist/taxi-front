import { Link } from "react-router-dom";

import theme from "tools/theme";

const Terms = () => {
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
      <div style={styleSection}>제 1조. 택시의 목적</div>
      <div style={styleContent}>
        1. 택시는 KAIST 구성원의 원활하고 안전한 택시 동승을 위해 KAIST 학부
        동아리 SPARCS &#40;이하 &quot;SPARCS&quot;&#41;에서 제공하는 택시 동승
        인원 모집 서비스입니다.
        <br />
        2. 1조 1항에서의 KAIST 구성원이란 교수, 교직원, 그리고 재학생과 졸업생
        등을 나타냅니다.
      </div>
      <div style={styleSection}>제 2조. 가입 및 탈퇴</div>
      <div style={styleContent}>
        1. 택시는 KAIST 구성원만 이용 가능합니다.
        <br />
        2. 택시는 SPARCS SSO를 통해 가입할 수 있습니다.
        <br />
        - SPARCS SSO에서 카이스트 통합인증으로 가입시 별도 승인 없이 바로 서비스
        이용이 가능합니다. (교수, 교직원, 재학생, 졸업생 등)
        <br />
        - SPARCS SSO에서 카이스트 통합인증 외 다른 방법으로 가입시 택시 운영진이
        승인해야만 서비스 이용이 가능합니다. (입주 업체 등)
        <br />
        3. 택시는 회원탈퇴 기능이 없습니다. 다만, 택시 운영진에게 회원 탈퇴를
        요청할 수 있습니다.
        <br />
        4. 다음의 경우에는 회원자격이 박탈될 수 있습니다.
        <br />
        - 카이스트 구성원이 아닌 것으로 밝혀졌을 경우
        <br />
        - Taxi 이용약관에 명시된 회원의 의무를 지키지 않은 경우
        <br />- 택시 이용 중 정보통신망 이용촉진 및 정보보호 등에 관한 법률 및
        관계 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우
      </div>
      <div style={styleSection}>제 3조. 회원의 의무</div>
      <div style={styleContent}>
        1. 회원은 택시 이용과 관련하여 다음의 행위를 하여서는 안 됩니다.
        <br />
        - SPARCS, 택시 운영진, 또는 특정 개인 및 단체를 사칭하는 행위
        <br />
        - 택시를 이용하여 얻은 정보를 원작자나 택시 운영진의 사전 승낙 없이
        복사, 복제, 변경, 번역, 출판, 방송, 기타의 방법으로 사용하거나 이를
        타인에게 제공하는 행위
        <br />
        - 다른 회원의 계정을 부정 사용하는 행위
        <br />
        - 타인의 명예를 훼손하거나 모욕하는 행위 <br />
        - 타인의 지적재산권 등의 권리를 침해하는 행위 <br />
        - 해킹행위 또는 컴퓨터바이러스의 유포 행위 <br />
        - 광고성 정보 등 일정한 내용을 지속적으로 전송하는 행위 <br />
        - 서비스의 안정적인 운영에 지장을 주거나 줄 우려가 있는 일체의 행위
        <br />
        - 범죄행위를 목적으로 하거나 기타 범죄행위와 관련된 행위 <br />
        - SPARCS의 동의 없이 택시를 영리목적으로 사용하는 행위 <br />
        - 기타 택시의 커뮤니티 강령에 반하거나 택시 서비스 운영상 부적절하다고
        판단하는 행위 <br />
        2. 회원은 택시 이용시 모든 상황에서 다음의 커뮤니티 강령을 유의해야
        합니다. <br />
        - 언제나 스스로의 말에 책임감을 가져주시기 바랍니다.
        <br />
        - KAIST 인권윤리센터의 방침에 따라 증오와 차별 표현은 지양해주시고,
        국가인권위원회법이 규정한 평등권 침해의 차별행위가 포함되지 않도록
        부탁드립니다. <br />
        - 국가인권위원회법이 금지하는 차별행위 19가지 <br />
        - 글에 욕설/비속어/은어를 자제해주시기 바랍니다. <br />- 글에 상대방이
        불쾌감을 느낄 수 있는 표현, 일체의 성적 대상화를 자제해주시기 바랍니다.
      </div>
      <div style={styleSection}>제 4조. 책임의 제한</div>
      <div style={styleContent}>
        1. SPARCS는 다음의 사유로 서비스 제공을 중지하는 것에 대해 책임을 지지
        않습니다.
        <br />
        - 설비의 보수 등을 위해 부득이한 경우
        <br />
        - KAIST가 전기통신서비스를 중지하는 경우
        <br />
        - 천재지변, 정전 및 전시 상황인 경우
        <br />
        - 기타 본 서비스를 제공할 수 없는 사유가 발생한 경우
        <br />
        2. SPARCS는 다음의 사항에 대해 책임을 지지 않습니다.
        <br />
        - 개재된 회원들의 글/채팅에 대한 신뢰도, 정확도
        <br />
        - 택시를 매개로 회원 상호 간 및 회원과 제 3자 간에 발생한 분쟁
        <br />
        - 기타 택시 사용 중 발생한 피해 및 분쟁
        <br />
        3. 법적 수사 요청이 있는 경우, SPARCS는 수사기관에 회원 개인정보를
        제공할 수 있습니다.
      </div>
      <div style={styleSection}>제 5조. 문의 및 제보</div>
      <div style={styleContent}>
        1. 택시에 대한 건의사항 또는 버그에 대한 사항은 채널톡 챗봇을 통해 문의
        및 제보할 수 있습니다.
        <br />
        2. 5조 1항의 채널톡 챗봇이 작동하지 않거나, 기타 사항의 경우
        taxi@sparcs.org 를 통해 문의 및 제보할 수 있습니다.
      </div>
      <div style={styleSection}>제 6조. 게시, 개정 및 해석</div>
      <div style={styleContent}>
        1. 택시 운영진은 본 약관에 대해 택시 회원가입시 회원의 동의를 받습니다.
        <br />
        2. 택시 운영진은 약관의규제에관한법률,
        정보통신망이용촉진및정보보호등에관한법률 등 관련법을 위배하지 않는
        범위에서 본 약관을 개정할 수 있습니다.
        <br />
        3. 본 약관의 해석은 택시 운영진이 담당하며, 분쟁이 있을 경우 민법 등
        관계 법률과 관례에 따릅니다.
      </div>
      <div style={styleSection}>제 7조. 개인정보 수집 및 이용</div>
      <div style={styleContent}>
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
        <br />- 개인정보의 보유 및 이용 기간 : 탈퇴일로부터 1년
        <br />
        3. 개인정보 수집 및 이용을 거부하실 수 있으나, 이는 서비스 제공에
        필수적으로 제공되어지는 정보이므로, 동의를 거부하실 경우 택시 서비스를
        이용 하실 수 없습니다.
      </div>
      <div style={styleSection}>본 약관은 2023-04-10부터 적용됩니다.</div>
      <div style={styleSection}>
        본인은 위 내용을 충분히 숙지하였으며, 이용 약관, 개인정보 수집 및 이용에
        동의합니다.
      </div>
    </div>
  );
};

export default Terms;
