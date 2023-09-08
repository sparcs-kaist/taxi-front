import AdaptiveDiv from "components/AdaptiveDiv";
import HeaderWithLeftNav from "components/Header/HeaderWithLeftNav";
import Title from "components/Title";

const Event2023FallHistory = () => {
  return (
    <AdaptiveDiv type="center">
      <HeaderWithLeftNav
        value="history"
        options={[
          { value: "store", label: "달토끼 상점", to: "/event/2023fall-store" },
          {
            value: "history",
            label: "구매 이력",
            to: "/event/2023fall-history",
          },
        ]}
      />
      <Title icon="notice" isHeader>
        2023Fall 구매 이력
      </Title>
    </AdaptiveDiv>
  );
};

export default Event2023FallHistory;
