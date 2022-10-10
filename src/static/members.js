/**
 * TAXI-SPARCS Members 활동 학기 인정 기준
 * (다음의 조건을 만족해야 활동한 학기로 인정됩니다)
 *
 * - Project Manager
 *   - 80% 이상의 회의에 참여하여야 활동한 학기로 인정됩니다.
 *
 * - Designer
 *   - 80% 이상의 회의에 참여하여야 활동한 학기로 인정됩니다.
 *
 * - Developer
 *   - 80% 이상의 공동 코딩에 참여하여야 활동한 학기로 인정됩니다.
 *   - Github repo(front,back,app,docker)의 assign된 PR이 3개 이상이어야 합니다.
 *
 * Members 정렬 기준
 *  - (참여한 회의 횟수 + 참여한 공동 코딩 횟수 + Github PR 개수) 많은 팀원
 *  - 위 기준이 동일할 경우, 가장 최근에 활동한 팀원
 */

export default [
  {
    position: "Project Manager",
    list: [
      { name: "김건", id: "suwon", period: "2022" }, // 22봄 ~ 22가을 (누적 3학기)
      { name: "이채영", id: "stitch", period: "2021" }, // 21봄 ~ 21겨울 (누적 4학기)
    ],
  },
  {
    position: "Designer",
    list: [{ name: "최지헌", id: "agent", period: "2021 ~ 2022" }], // 21여름 ~ 21겨울 (누적 6학기)
  },
  {
    position: "Developer",
    list: [
      { name: "정상", id: "macintosh", period: "2021 ~ 2022" }, // 21가을 ~ 22가을 (누적 5학기)
      { name: "최지헌", id: "agent", period: "2022" }, // 22봄 ~ 22가을 (누적 3학기)
      { name: "이진우", id: "jaydub", period: "2022" }, // 22봄 ~ 22가을 (누적 2학기)
      { name: "최준영", id: "dogma", period: "2021" }, // 21봄 ~ 21겨울 (누적 4학기)
      { name: "김태우", id: "toby", period: "2021 ~ 2022" }, // 21가을 ~ 22봄 (누적 3학기)
      { name: "이서완", id: "swany", period: "2022" }, // 22봄 ~ 22가을 (누적 3학기)
      { name: "예상우", id: "andy", period: "2022" }, // 22봄 ~ 22가을 (누적 3학기)
      { name: "신태현", id: "kiko", period: "2022" }, // 22봄 ~ 22여름 (누적 2학기)
      { name: "손성민", id: "happycastle", period: "2022" }, // 22여름 ~ 22가을 (누적 2학기)
      { name: "김효경", id: "diana", period: "2022" }, // 22가을 ~ 22가을 (누적 1학기)
      { name: "박진호", id: "bread", period: "2021" }, // 21가을 ~ 21겨울 (누적 2학기)
      { name: "김건", id: "suwon", period: "2021 ~ 2022" }, // 21봄 ~ 21겨울 (누적 4학기)
      { name: "이채영", id: "stitch", period: "2021" }, // 21봄 ~ 21겨울 (누적 4학기)
    ],
  },
];
