import { useState } from "react";



import useQuery from "hooks/useTaxiAPI";



import AdaptiveDiv from "components/AdaptiveDiv";
import HeaderWithLeftNav from "components/Header/HeaderWithLeftNav";
import Title from "components/Title";
import WhiteContainer from "components/WhiteContainer";


const LeaderboardItem = () => {
  return <WhiteContainer css={{ display: "flex" }}></WhiteContainer>;
};

const Event2023FallLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [, leaderboard] = useQuery.get("/reports/searchByUser");
  return (
    <AdaptiveDiv type="center">
      <HeaderWithLeftNav
        value="leaderboard"
        options={[
          { value: "store", label: "달토끼 상점", to: "/event/2023fall-store" },
          {
            value: "history",
            label: "구매 이력",
            to: "/event/2023fall-history",
          },
          {
            value: "leaderboard",
            label: "리더보드",
            to: "/event/2023fall-leaderboard",
          },
        ]}
      />
      <Title icon="notice" isHeader>
        리더보드
      </Title>
      <AdaptiveDiv type="center"></AdaptiveDiv>
    </AdaptiveDiv>
  );
};

export default Event2023FallLeaderboard;