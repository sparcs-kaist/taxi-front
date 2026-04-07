const nouns = [
  "재료역학",
  "경영학개론",
  "유체역학",
  "양자역학",
  "분자세포생물학",
  "제조 프로세스 혁신",
  "기초 디자인",
  "분자생물학",
  "열과 분자의 이동",
  "현대대수학",
  "소재역학",
  "원자로 이론",
  "지성과 문명 강독",
  "운영체제 및 실험",
  "전자설계 및 실험",
  "기초항공프로젝트",
  "화학전공실험",
];

const adjectives = [
  "정직한",
  "재미있는",
  "재미없는",
  "자신감 있는",
  "여유로운",
  "애정깊은",
  "귀여운",
  "사랑스러운",
  "사려깊은",
  "침착한",
  "끈질긴",
  "친절한",
  "다급한",
  "징징대는",
  "밉상인",
  "엄격한",
  "공격적인",
  "발끈하는",
  "까다로운",
  "고삐풀린 망아지 같은",
];

export const generateNickname = () => {
  const nounIdx = Math.floor(Math.random() * nouns.length);
  const adjectiveIdx = Math.floor(Math.random() * adjectives.length);
  const noun = nouns[nounIdx];
  const adjective = adjectives[adjectiveIdx];

  // 프론트엔드용 가벼운 랜덤 16진수 5자리 생성 (crypto 에러 방지용)
  // 백엔드의 해시값 추출 로직(hash.digest("hex").substring(0, 5))과 결과물이 동일합니다.
  const randomHex = Math.random().toString(16).substring(2, 7).padEnd(5, "0");

  return `${adjective} ${noun}_${randomHex}`;
};
