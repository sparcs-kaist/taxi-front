import AdaptiveDiv from "components/AdaptiveDiv";
import HeaderWithLeftNav from "components/Header/HeaderWithLeftNav";
import Title from "components/Title";

const Event2023FallMissions = () => {
  return (
    <AdaptiveDiv type="center">
      <HeaderWithLeftNav
        value="missions"
        options={[
          {
            value: "missions",
            label: "퀘스트",
            to: "/event/2023fall-missions",
          },
        ]}
      />
      <Title icon="notice" isHeader>
        2023Fall 퀘스트 - To Do
      </Title>
    </AdaptiveDiv>
  );
};

export default Event2023FallMissions;
