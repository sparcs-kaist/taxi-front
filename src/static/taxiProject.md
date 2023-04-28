# Taxi

- Logo

## Service Link

- taxi.sparcs.org

## Introduction

> Taxi는 카이스트 구성원 간 택시 동승자 모집 서비스입니다. 기계동 택시승강장, 대전역, 버스터미널 등의 출발/도착지나 출발 시간을 기반으로 택시 동승자를 찾을 수 있습니다. 채팅 기능을 통해 세부적인 장소와 시간을 조율하고 동승 이후에는 정산 현황을 빠르게 파악할 수 있도록 도와줍니다.

> 비교적 거리가 먼 장소에 갈 때 택시 동승이 빈번하게 발생하는 점을 인지하고, 이를 어플/웹서비스를 통해 보다 편리하게 이루어지도록 하고자 합니다.

## Background

- "2011 카이스트 뉴스", "2018 카카오모빌리티 리포트"에서 소개될 정도로 카이스트는 택시들의 인기 출발지 입니다.
- 따라서, 같은 시각과 목적지의 동승자를 모아 택시비를 절감하고 싶어하는 학우 분들이 많습니다.
- 하지만, 커뮤니티 사이트, SNS 등을 이용한 택시 동승인원 모집은 플랫폼 상의 한계가 존재합니다.
- 꾸준히 Ara, 오프라인 상으로 택시 동승 모집 서비스의 필요성이 제기되었습니다.

## Goal

- 카이스트 학생들의 안전한 택시 동승 문화를 만들 수 있는 서비스
- 따로 연락처를 주고 받을 필요 없이 한 어플에서 해결가능한 서비스
- 학생들이 편하게 접할 수 있는 SPARCS 서비스

## History

- 2021년 봄학기 : `Toy Project`로 서비스 개발을 시작하였습니다.
- 2022년 가을학기 : `Taxi Beta`를 출시 및 홍보하였습니다.
- 2022년 가을학기 : `Taxi` 정식 서비스를 출시 및 홍보하였습니다.

## Presentations

- [2021년 가을학기 SPARCS Homecoming](https://s3.ap-northeast-2.amazonaws.com/sparcs.home/stitch_1637422019377.pdf) / 이채영-stitch
- [2022년 봄학기 SPARCS 임시총회](https://s3.ap-northeast-2.amazonaws.com/sparcs.home/suwon_1660753366898.pdf) / 김건-suwon
- [2022년 봄학기 Taxi Intern Project](https://s3.ap-northeast-2.amazonaws.com/sparcs.home/andy_1659942777418.pptx) / 예상우-andy
- [2022년 가을학기 SPARCS 개강총회](https://s3.ap-northeast-2.amazonaws.com/sparcs.home/suwon_1682521842595.pdf) / 김건-suwon
- [2022년 가을학기 SPARCS Homecoming](https://s3.ap-northeast-2.amazonaws.com/sparcs.home/agent%2C+andy%2C+macintosh_1682521983214.pdf) / 예상우-andy, 최지헌-agent, 정상-macintosh
- [2022년 가을학기 SPARCS 종강총회](https://s3.ap-northeast-2.amazonaws.com/sparcs.home/suwon_1682522169035.pdf) / 김건-suwon
- [2022년 가을학기 Taxi Intern Project](https://s3.ap-northeast-2.amazonaws.com/sparcs.home/won_1682522258809.pptx) / 최동원-won

## Collaboration

- 매주 화요일 오후 9시 ~ 12시에 회의 및 공동 코딩을 진행합니다.
- 대면 회의는 교양분관 SPARCS 동방에서 진행되며, 비대면 회의는 디스코드에서 진행됩니다.
- 협업을 위해 `Notion`, `Github`, `Slack`, `Figma`, `Discord`를 사용하고 있습니다.
- Notion을 통해 `Coding Rules`, `Coding Conventions`을 지정하고, 매주 회의록을 작성합니다.
- 공지, 질문, 아이디어 제안, Github Bot, 자동배포 봇, Notion Bot등의 Slack 채널이 있습니다.
- [Figma](https://www.figma.com/file/7Y8jsGFupTqruFu636r0Mz/SPARCS-Taxi-Design)로 디자인 작업을 합니다.

## Development Process

1. 회의에서 제시된 아이디어 및 발견된 버그의 문제 해결을 논의합니다.
2. 기획 후 Figma로 디자인합니다.
3. 하나의 작업은 여러 Task로 분할될 수 있고, 각 Task들을 팀원들과 분할합니다.
   - 새로운 Task가 생기면 Template(Issue, bug-report 등)에 맞게 Github Issue를 생성합니다.
4. Github Pull Request 로 작업 내용을 공유합니다.
   - Template에 맞게 작업한 내용을 설명하여 공유합니다.
5. Code Review를 통한 팀원들의 피드백을 받습니다.
   - 2개 이상의 approve가 있어야, Merge가 가능합니다.
6. Github Action으로 Unit & E2E 테스트로 코드를 검증합니다.
7. 개발용 서비스에 자동 배포 후, 실 서비스에서 발생할 수 있는 문제를 사전에 확인해봅니다.
8. 실 서비스에 자동 배포합니다.

## GitHub Repositories & Technology Stacks

- [taxi-front](https://github.com/sparcs-kaist/taxi-front) : `React`
- [taxi-back](https://github.com/sparcs-kaist/taxi-back) : `Express` + `Mongo DB` + `Redis`
- [taxi-app](https://github.com/sparcs-kaist/taxi-app) : `Flutter`

## Credit

- Project Manager
  ```javascript
  { name: "김건", id: "suwon", period: "2022 ~ 2023" }, // 22봄 ~ 23봄 (누적 5학기)
  { name: "이채영", id: "stitch", period: "2021" }, // 21봄 ~ 21겨울 (누적 4학기)
  ```
- Designer
  ```javascript
  { name: "최지헌", id: "agent", period: "2021 ~ 2022" }, // 21여름 ~ 22겨울 (누적 7학기)
  { name: "이혜원", id: "chillo", period: "2021" }, // 21가을 ~ 21겨울 (누적 2학기)
  ```
- Developer
  ```javascript
  { name: "정상", id: "macintosh", period: "2021 ~ 2023" }, // 21가을 ~ 23봄 (누적 7학기)
  { name: "최지헌", id: "agent", period: "2022" }, // 22봄 ~ 22겨울 (누적 4학기)
  { name: "이진우", id: "jaydub", period: "2022" }, // 22봄 ~ 22겨울 (누적 3학기)
  { name: "예상우", id: "andy", period: "2022 ~ 2023" }, // 22봄 ~ 23봄 (누적 5학기)
  { name: "손성민", id: "happycastle", period: "2022 ~ 2023" }, // 22여름 ~ 23봄 (누적 4학기)
  { name: "최동원", id: "won", period: "2022 ~ 2023" }, // 22가을 ~ 23봄 (누적 3학기)
  { name: "이서완", id: "swany", period: "2022 ~ 2023" }, // 22봄 ~ 23봄 (누적 5학기)
  { name: "최준영", id: "dogma", period: "2021" }, // 21봄 ~ 21겨울 (누적 4학기)
  { name: "김태우", id: "toby", period: "2021 ~ 2022" }, // 21가을 ~ 22봄 (누적 3학기)
  { name: "안태찬", id: "return", period: "2022 ~ 2023" }, // 22가을 ~ 23봄 (누적 3학기)
  { name: "김효경", id: "diana", period: "2022 ~ 2023" }, // 22가을 ~ 23봄 (누적 3학기)
  { name: "신태현", id: "kiko", period: "2022" }, // 22봄 ~ 22여름 (누적 2학기)
  { name: "박진호", id: "bread", period: "2021" }, // 21가을 ~ 21겨울 (누적 2학기)
  { name: "송인화", id: "ina", period: "2021" }, // 21봄 ~ 21여름 (누적 2학기)
  { name: "박지호", id: "night", period: "2022" }, // 22여름 ~ 22가을 (누적 2학기)
  { name: "김건", id: "suwon", period: "2021 ~ 2023" }, // 21봄 ~ 21겨울 (누적 4학기)
  { name: "이채영", id: "stitch", period: "2021" }, // 21봄 ~ 21겨울 (누적 4학기)
  ```

## Contact

- channeltalk : [택시 마이페이지](https://taxi.sparcs.org/mypage) 에서 "채털톡 문의하기" 버튼 클릭
- email : taxi@sparcs.org
