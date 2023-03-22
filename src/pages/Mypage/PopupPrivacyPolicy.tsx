import { useTranslation } from "react-i18next";
import Modal from "components/Modal";
import theme from "tools/theme";

import { ReactComponent as TaxiLogo } from "static/assets/TaxiLogo.svg";

type PopupPrivacyPolicyProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Policy = () => {
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
        &lt; SPARCS &gt;(&quot;https://taxi.sparcs.org&quot;이하
        &quot;Taxi&quot;)은(는) 「개인정보 보호법」 제30조에 따라 정보주체의
        개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수
        있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
        <br />○ 이 개인정보처리방침은 2023년 3월 4부터 적용됩니다.
      </div>
      <div style={styleSection}>제1조(개인정보의 처리 목적)</div>
      <div style={styleSection}>
        &lt; SPARCS &gt;(&quot;https://taxi.sparcs.org&quot;이하
        &quot;Taxi&quot;)은(는) 다음의 목적을 위하여 개인정보를 처리합니다.
        처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며
        이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의
        동의를 받는 등 필요한 조치를 이행할 예정입니다.
      </div>
      <div style={styleContent}>
        1. 홈페이지 회원가입 및 관리
        <br />
        회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격
        유지·관리, 서비스 부정이용 방지 목적으로 개인정보를 처리합니다.
      </div>
      <div style={styleSection}>제2조(개인정보의 처리 및 보유 기간)</div>
      <div style={styleContent}>
        ① &lt; SPARCS &gt;은(는) 법령에 따른 개인정보 보유·이용기간 또는
        정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간
        내에서 개인정보를 처리·보유합니다.
        <br />
        ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
        <br />
        - 1.&lt;홈페이지 회원가입 및 관리&gt;
        <br />
        - &lt;홈페이지 회원가입 및 관리&gt;와 관련한 개인정보는 수집.이용에 관한
        동의일로부터&lt;1년&gt;까지 위 이용목적을 위하여 보유.이용됩니다.
        <br />- 보유근거 : 회원가입 및 탈퇴 의사의 확인, 회원 식별
      </div>
      <div style={styleSection}>제3조(처리하는 개인정보의 항목)</div>
      <div style={styleContent}>
        ① &lt; SPARCS &gt;은(는) 다음의 개인정보 항목을 처리하고 있습니다.
        <br />- 1&lt; 홈페이지 회원가입 및 관리 &gt;
        <br />- 필수항목 : 이메일, 이름, 접속 로그, 접속 IP 정보, 학번
      </div>
      <div style={styleSection}>제4조(개인정보의 파기절차 및 파기방법)</div>
      <div style={styleContent}>
        ① &lt; SPARCS &gt; 은(는) 개인정보 보유기간의 경과, 처리목적 달성 등
        개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
        <br />
        ② 개인정보 파기의 절차 및 방법은 다음과 같습니다.
        <br />
        1. 파기절차
        <br />
        &lt; SPARCS &gt; 은(는) 파기 사유가 발생한 개인정보를 선정하고, &lt;
        SPARCS &gt; 의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.
        <br />
        2. 파기방법
        <br />
        전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다
      </div>
      <div style={styleSection}>
        제5조(정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한 사항)
      </div>
      <div style={styleContent}>
        ① 정보주체는 SPARCS에 대해 언제든지 개인정보 열람·정정·삭제·처리정지
        요구 등의 권리를 행사할 수 있습니다.
        <br />
        ② 제1항에 따른 권리 행사는SPARCS에 대해 「개인정보 보호법」 시행령
        제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수
        있으며 SPARCS은(는) 이에 대해 지체 없이 조치하겠습니다.
        <br />
        ③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등
        대리인을 통하여 하실 수 있습니다.이 경우 “개인정보 처리 방법에 관한
        고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
        <br />
        ④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항,
        제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.
        <br />
        ⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집
        대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.
        <br />⑥ SPARCS은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구,
        처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를
        확인합니다.
      </div>
      <div style={styleSection}>
        제6조(개인정보의 안전성 확보조치에 관한 사항)
      </div>
      <div style={styleSection}>
        &lt; SPARCS &gt;은(는) 개인정보의 안전성 확보를 위해 다음과 같은 조치를
        취하고 있습니다.
      </div>
      <div style={styleContent}>
        1. 개인정보 취급 직원의 최소화 및 교육
        <br />
        개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여
        개인정보를 관리하는 대책을 시행하고 있습니다.
        <br />
        2. 내부관리계획의 수립 및 시행
        <br />
        개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고
        있습니다.
        <br />
        3. 해킹 등에 대비한 기술적 대책
        <br />
        &lt;SPARCS&gt;(&quot;Taxi&quot;)은 해킹이나 컴퓨터 바이러스 등에 의한
        개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인
        갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고
        기술적/물리적으로 감시 및 차단하고 있습니다.
        <br />
        4. 개인정보의 암호화
        <br />
        이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고 있어,
        본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화
        하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.
        <br />
        5. 개인정보에 대한 접근 제한
        <br />
        개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의
        부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를
        하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고
        있습니다.
        <br />
        6. 비인가자에 대한 출입 통제
        <br />
        개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해
        출입통제 절차를 수립, 운영하고 있습니다.
      </div>
      <div style={styleSection}>
        제7조(개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한
        사항)
      </div>
      <div style={styleContent}>
        ① SPARCS 은(는) 이용자에게 개별적인 맞춤서비스를 제공하기 위해
        이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.
        <br />
        ② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터
        브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의
        하드디스크에 저장되기도 합니다.
        <br />
        가. 쿠키의 사용 목적 : 이용자가 방문한 각 서비스에 대한 방문 및
        이용형태, 보안접속 여부 등을 파악하여 이용자에게 최적화된 정보 제공을
        위해 사용됩니다.
        <br />
        나. 쿠키의 설치•운영 및 거부 : 웹브라우저 상단의 도구&gt;인터넷
        옵션&gt;개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수
        있습니다.
        <br />
        다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수
        있습니다.
      </div>
      <div style={styleSection}>제8조 (개인정보 보호책임자에 관한 사항)</div>
      <div style={styleContent}>
        ① &lt; SPARCS &gt;(&quot;Taxi&quot;) 은(는) 개인정보 처리에 관한 업무를
        총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및
        피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고
        있습니다.
        <br />
        - 성명 :김건
        <br />- 연락처 :010-5633-6757, geon6757@kaist.ac.kr
        <br />② 정보주체께서는 &lt; SPARCS &gt;(&quot;Taxi&quot;) 의 서비스를
        이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제
        등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다.
        &lt; SPARCS &gt;(&quot;Taxi&quot;)은(는) 정보주체의 문의에 대해 지체
        없이 답변 및 처리해드릴 것입니다.
      </div>
      <div style={styleSection}>
        제9조(개인정보의 열람청구를 접수·처리하는 부서)
      </div>
      <div style={styleSection}>
        정보주체는 ｢개인정보 보호법｣ 제35조에 따른 개인정보의 열람 청구를 아래의
        부서에 할 수 있습니다.
        <br />
        &lt; SPARCS &gt;(&quot;Taxi&quot;)은(는) 정보주체의 개인정보 열람청구가
        신속하게 처리되도록 노력하겠습니다.
      </div>
      <div style={styleContent}>
        - 담당자 : 김건
        <br />- 연락처 : 010-5633-6757, geon6757@kaist.ac.kr
      </div>
      <div style={styleSection}>
        제10조(정보주체의 권익침해에 대한 구제방법)
      </div>
      <div style={styleContent}>
        정보주체는 개인정보침해로 인한 구제를 받기 위하여
        개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에
        분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의
        신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.
        <br />
        1. 개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)
        <br />
        2. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)
        <br />
        3. 대검찰청 : (국번없이) 1301 (www.spo.go.kr)
        <br />
        4. 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)
        <br />
        「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제),
        제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대 하여 공공기관의
        장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는
        행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.
        <br />※ 행정심판에 대해 자세한 사항은
        중앙행정심판위원회(www.simpan.go.kr) 홈페이지를 참고하시기 바랍니다.
      </div>
      <div style={styleSection}>제11조(개인정보 처리방침 변경)</div>
      <div style={styleSection}>
        이 개인정보처리방침은 2023년 3월 4부터 적용됩니다.
      </div>
    </div>
  );
};

const PopupPrivacyPolicy = ({ isOpen, onClose }: PopupPrivacyPolicyProps) => {
  const { t } = useTranslation("mypage");

  const styleTop: CSS = {
    display: "flex",
    alignItems: "center",
    margin: "8px 0 16px 8px",
    ...theme.font16_bold,
    columnGap: "8px",
  };

  return (
    <Modal display={isOpen} onClickClose={onClose} padding="16px" width={755}>
      <div style={styleTop}>
        <TaxiLogo style={{ height: "27px" }} />
        {t("privacy_policy")}
      </div>
      <Policy />
    </Modal>
  );
};

export default PopupPrivacyPolicy;
