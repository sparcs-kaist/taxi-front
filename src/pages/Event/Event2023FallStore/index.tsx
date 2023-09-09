import useQuery from "hooks/useTaxiAPI";

import AdaptiveDiv from "components/AdaptiveDiv";
import type { EventItemProps } from "components/Event/EventItem";
import EventItem from "components/Event/EventItem";
import HeaderWithLeftNav from "components/Header/HeaderWithLeftNav";
import Title from "components/Title";

import NPCSection from "./NPCSection";

type EventItemRespose = {
  items: EventItemProps[];
};

const FlexWrapDiv = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      css={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {children}
    </div>
  );
};

const Event2023FallStore = () => {
  const [, eventItemList] = useQuery.get("/events/2023fall/items/list");
  console.log(eventItemList);

  return (
    <>
      <HeaderWithLeftNav
        value="store"
        options={[
          { value: "store", label: "달토끼 상점", to: "/event/2023fall-store" },
          {
            value: "history",
            label: "구매 이력",
            to: "/event/2023fall-history",
          },
        ]}
      />
      <NPCSection />
      <div css={{ marginTop: "-15px" }} />
      <AdaptiveDiv type="center">
        <Title isHeader>응모권</Title>
        <FlexWrapDiv>
          {eventItemList?.items
            .filter((item: EventItemProps) => item.name.includes("응모권"))
            .map((item: EventItemProps, key: number) => (
              <EventItem {...item} key={key} />
            ))}
        </FlexWrapDiv>

        <Title isHeader>아이템</Title>
        <FlexWrapDiv>
          {eventItemList?.items
            .filter((item: EventItemProps) => !item.name.includes("응모권"))
            .map((item: EventItemProps, key: number) => (
              <EventItem {...item} key={key} />
            ))}
        </FlexWrapDiv>
      </AdaptiveDiv>
    </>
  );
};

export default Event2023FallStore;
