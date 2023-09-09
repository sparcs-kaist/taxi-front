import WhiteContainer from "components/WhiteContainer";

import theme from "tools/theme";

import { ReactComponent as CreditIcon } from "static/events/2023fallCredit.svg";

export type EventItemProps = {
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  isDisabled: boolean;
  stock: number;
  itemType: number;
};

const EventItem = (props: EventItemProps & { onClick: () => void }) => {
  return (
    <WhiteContainer
      css={{
        width: "calc(50% - 8px)",
        flexBasis: "calc(50% - 8px)",
        boxSizing: "border-box",
        minWidth: "100px",
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        gap: "8px",
        ...theme.font14,
      }}
      onClick={props.onClick}
    >
      <img
        css={{
          width: "100%",
          borderRadius: "12px",
          aspectRatio: "1/1",
        }}
        src={props.imageUrl}
        alt={props.name}
      />
      <div css={theme.font14_bold}>{props.name}</div>
      <div
        css={{
          display: "flex",
          gap: "4px",
        }}
      >
        <CreditIcon style={{ width: "27px", height: "16px" }} />
        <div>{props.price}</div>
      </div>
    </WhiteContainer>
  );
};

export default EventItem;
