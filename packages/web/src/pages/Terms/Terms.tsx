import AdaptiveDiv from "@/components/AdaptiveDiv";
import Footer from "@/components/Footer";
import Title from "@/components/Title";

import theme from "@/tools/theme";

const POLICY_LAST_UPDATED = "2026-02-27";

// TODO: 아래 3개는 꼭 너희 값으로 바꿔라 (Play Console 표기명과 동일 권장)
const APP_NAME = "Taxi";
const DEVELOPER_NAME = "SPARCS";
const SAFETY_EMAIL = "taxi@sparcs.org";

const Terms = () => {
  return (
    <AdaptiveDiv type="center">
      <Title isHeader>아동 안전 표준 정책</Title>

      <div css={{ padding: "0 20px 80px" }}>
        <div
          css={{
            background: theme.white,
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          <div
            css={{
              ...theme.font16_bold,
              color: theme.black,
              marginBottom: "6px",
              lineHeight: 1.35,
            }}
          >
            아동 안전 표준 정책 (CSAE/CSAM 대응)
          </div>

          <div
            css={{
              ...theme.font12,
              color: theme.gray_text,
              lineHeight: 1.6,
              marginBottom: "16px",
            }}
          >
            적용 대상: <b>{APP_NAME}</b> (개발자: <b>{DEVELOPER_NAME}</b>)
            <br />
            최종 업데이트: {POLICY_LAST_UPDATED}
          </div>

          <div
            css={{
              height: "1px",
              background: theme.gray_line,
              margin: "16px 0 20px",
            }}
          />

          <Section title="1. 목적">
            <p css={pStyle}>
              {APP_NAME}은(는) 아동의 안전을 최우선으로 하며, 아동 성적 학대 및
              착취(CSAE) 및 아동 성적 학대 콘텐츠(CSAM)를 포함한 모든 형태의
              아동 대상 유해 행위를 엄격히 금지합니다.
            </p>
          </Section>

          <Section title="2. 용어 정의">
            <ul css={ulStyle}>
              <li css={liStyle}>
                <b>CSAE</b>(Child Sexual Abuse and Exploitation): 아동을
                성적으로 착취하거나 학대하거나 위험에 빠뜨리는 콘텐츠 또는
                행위(예: 그루밍, 성착취 목적의 유인/접근, 아동 성착취, 아동
                성매매 등)를 의미합니다.
              </li>
              <li css={liStyle}>
                <b>CSAM</b>(Child Sexual Abuse Material): 미성년자가 포함된
                노골적인 성적 행위를 묘사하는 사진/동영상/컴퓨터 생성 이미지 등
                아동 성적 학대 콘텐츠를 의미하며 불법입니다.
              </li>
            </ul>
          </Section>

          <Section title="3. 금지되는 콘텐츠 및 행위 (무관용 원칙)">
            <p css={pStyle}>
              {APP_NAME}에서는 아래 항목을{" "}
              <b>어떠한 경우에도 허용하지 않습니다.</b>
            </p>
            <ol css={olStyle}>
              <li css={liStyle}>
                CSAM(아동 성적 학대 콘텐츠) 제작, 유포, 소지, 공유, 링크 제공,
                저장
              </li>
              <li css={liStyle}>
                아동 대상 성적 착취/그루밍/유인(만남 유도 포함) 및 성적 대화
                강요
              </li>
              <li css={liStyle}>
                미성년자 성착취·성매매 조장/알선/홍보, 관련 계정/커뮤니티 운영
              </li>
              <li css={liStyle}>
                아동 학대·폭력·위협의 조장/미화, 아동의 안전을 위협하는 활동
              </li>
              <li css={liStyle}>
                아동의 성적 대상화(외설적 표현, 성적 암시, 착취적 맥락의 노출
                등)
              </li>
            </ol>
          </Section>

          <Section title="4. 신고(인앱) 및 외부 신고 채널">
            <p css={pStyle}>
              {APP_NAME}은(는) 사용자가 <b>앱을 나가지 않고</b> 우려사항을
              제출할 수 있는 <b>인앱 신고/의견 전달 메커니즘</b>을 제공합니다.
            </p>

            <ul css={ulStyle}>
              <li css={liStyle}>
                <b>인앱 신고:</b> (예) 채팅 상세 화면의 신고하기 버튼
              </li>
              <li css={liStyle}>
                <b>이메일 신고:</b>{" "}
                <a css={linkStyle} href={`mailto:${SAFETY_EMAIL}`}>
                  {SAFETY_EMAIL}
                </a>
              </li>
            </ul>

            <p css={pStyle}>
              신고 시 가능하면 아래 정보를 포함해 주세요: (1) 대상 사용자/콘텐츠
              식별 정보(닉네임/ID/URL), (2) 발생 일시, (3) 구체적 설명, (4) 증빙
              자료(스크린샷 등)
            </p>
          </Section>

          <Section title="5. 조치 및 집행(모더레이션)">
            <p css={pStyle}>
              {APP_NAME}은(는) CSAM/CSAE 및 아동 안전 위반이 의심되거나 확인된
              경우, 관련 법규 및 본 정책에 따라 <b>적절한 조치</b>를 취합니다.
              예를 들어, 앱에서 CSAM을 실제로 인지한 경우 <b>삭제</b> 등의
              조치를 수행합니다.
            </p>
            <ul css={ulStyle}>
              <li css={liStyle}>콘텐츠 삭제/차단, 노출 제한</li>
              <li css={liStyle}>계정 경고, 이용 제한, 영구 정지</li>
              <li css={liStyle}>
                재발 방지 조치(기능 제한, 특정 행동 제한 등)
              </li>
              <li css={liStyle}>
                필요 시 관련 법에 따라 수사기관/관계기관에 신고 또는 자료 보존
                조치
              </li>
            </ul>
          </Section>

          <Section title="6. 법규 준수">
            <p css={pStyle}>
              {APP_NAME}은(는) CSAM/CSAE 및 아동 안전과 관련된 적용 가능한 현지
              법규와 규정을 준수합니다. (법적 해석이 필요한 사안은 관할 법률
              자문을 바탕으로 처리합니다.)
            </p>
          </Section>

          <Section title="7. 아동 안전 담당자(연락처)">
            <p css={pStyle}>
              Google Play 정책 준수 및 CSAM/CSAE 대응을 위해, {APP_NAME}은(는)
              아동 안전 담당자(Children Safety / CSAM Contact)를 지정합니다.
            </p>
            <ul css={ulStyle}>
              <li css={liStyle}>
                <b>담당자/팀:</b> CSAM Safety Contact ({DEVELOPER_NAME})
              </li>
              <li css={liStyle}>
                <b>연락처:</b>{" "}
                <a css={linkStyle} href={`mailto:${SAFETY_EMAIL}`}>
                  {SAFETY_EMAIL}
                </a>
              </li>
              <li css={liStyle}>
                <b>역할:</b> 신고 접수 및 검토, 조치 결정, 정책·절차 운영, 필요
                시 Google/관계기관 대응
              </li>
            </ul>
          </Section>

          <Section title="8. 투명성 및 정책 업데이트">
            <p css={pStyle}>
              본 정책은 법규/플랫폼 정책/서비스 운영 방식 변경에 따라 업데이트될
              수 있으며, 변경 사항은 본 페이지에 게시됩니다.
            </p>
          </Section>

          <div
            css={{
              marginTop: "20px",
              paddingTop: "16px",
              borderTop: `1px solid ${theme.gray_line}`,
              color: theme.gray_text,
              fontSize: "12px",
              lineHeight: 1.6,
            }}
          >
            본 페이지는 Google Play 아동 안전 표준 정책 요구사항에 따라
            게시됩니다.
          </div>
        </div>
      </div>

      <Footer type="only-logo" />
    </AdaptiveDiv>
  );
};

export default Terms;

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section css={{ marginBottom: "18px" }}>
      <div
        css={{
          ...theme.font14_bold,
          color: theme.black,
          marginBottom: "8px",
        }}
      >
        {title}
      </div>
      <div css={{ color: theme.black }}>{children}</div>
    </section>
  );
};

const pStyle = {
  margin: "0 0 10px 0",
  fontSize: "13px",
  color: theme.gray_text,
  lineHeight: 1.7,
} as const;

const ulStyle = {
  margin: "0 0 10px 0",
  paddingLeft: "18px",
  fontSize: "13px",
  color: theme.gray_text,
  lineHeight: 1.7,
} as const;

const olStyle = {
  margin: "0 0 10px 0",
  paddingLeft: "18px",
  fontSize: "13px",
  color: theme.gray_text,
  lineHeight: 1.7,
} as const;

const liStyle = {
  marginBottom: "6px",
} as const;

const linkStyle = {
  color: theme.purple,
  fontWeight: 700,
  textDecoration: "underline",
} as const;
