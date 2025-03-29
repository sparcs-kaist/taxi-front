import CardCenterImage from "./CardCenterImage";
import CardLeadingIcon from "./CardLeadingIcon";
import CardOnlyText from "./CardOnlyText";
import CardRoom from "./CardRoom";

export type CardProps = {
  type: "Room" | "Only Text" | "Leading Icon" | "Center Image";
  title?: string;
  subtitle?: string;
  leadingIcon?: string;
  roomInfo?: TaxiRoomInfoProps;
  buttonLabel?: string;
  imageUrl?: string;
  onPress?: () => void;
};
export type TaxiRoomInfoProps = {
  roomTitle: string;
  roomTagList: Array<string>;
  roomMaxPerson: number;
  roomNumPerson: number;
  roomStartTime: Date;
  roomFrom: string;
  roomTo: string;
};

export type ButtonProps = {
  label: string;
  width?: number;
  onPress: () => void;
};

export type IconButtonProps = {
  icon: string;
  onPress: () => void;
};

const Card = ({
  type,
  title,
  subtitle,
  leadingIcon,
  imageUrl,
  roomInfo,
  buttonLabel,
  onPress,
}: CardProps) => {
  if (type === "Room" && roomInfo) {
    return (
      <CardRoom
        roomTitle={roomInfo.roomTitle}
        roomNumPerson={roomInfo.roomNumPerson}
        roomMaxPerson={roomInfo.roomMaxPerson}
        roomStartTime={roomInfo.roomStartTime}
        roomFrom={roomInfo.roomFrom}
        roomTo={roomInfo.roomTo}
        roomTagList={roomInfo.roomTagList}
      />
    );
  } else if (type === "Only Text" && title && subtitle && onPress) {
    return (
      <CardOnlyText
        type={type}
        title={title}
        subtitle={subtitle}
        onPress={onPress}
      />
    );
  } else if (type === "Leading Icon" && title && subtitle && leadingIcon) {
    return (
      <CardLeadingIcon
        type={type}
        title={title}
        subtitle={subtitle}
        leadingIcon={leadingIcon}
        onPress={onPress}
      />
    );
  } else if (
    type === "Center Image" &&
    title &&
    subtitle &&
    buttonLabel &&
    onPress
  ) {
    return (
      <CardCenterImage
        type={type}
        title={title}
        subtitle={subtitle}
        buttonLabel={buttonLabel}
        imageUrl={imageUrl}
        onPress={onPress}
      />
    );
  } else {
    return <></>;
  }
};

export default Card;
