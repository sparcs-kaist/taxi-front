const roomNames = [
  "택시타고 가자",
  "택시타고 가요",
  "택시타고 가요~",
  "모두 택시로 가요",
  "택시타러 가요",
  "누가 걸어가요?",
  "누가 걸어가요? 택시타요",
  "편하게 택시타요",
  "편하게 택시타요~",
  "운동은 나중에",
  "인생은 택시",
  "카이생의 택시",
];
const randomRoomName = roomNames[Math.floor(Math.random() * roomNames.length)];

export default randomRoomName;
