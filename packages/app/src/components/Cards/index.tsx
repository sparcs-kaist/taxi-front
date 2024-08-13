import { StyleSheet } from "react-native";

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

export const layoutScheme = {
  borderRadius: 12,
  paddingHorizontal: 24,
  paddingVertical: 16,
  chipPaddingHorizontal: 8,
  chipPaddingVertical: 6,
  chipBorderRadius: 6,
  gap: 8,
  cardWidth: 327,
  cardImageHeight: 128,
  leadingIconContainerSize: 40,
  leadingIconContainerPadding: 8,
  iconSize: 24,
  iconButtonPadding: 12,
  iconButtonSize: 48,
};

export const colorScheme = {
  primary: "#5E35B1",
  secondary: "#c717fc",
  tintGray900: "#212121",
  tintGray700: "#606061",
  tintGray500: "#9D9C9E",
  tintGray300: "#DFDEE0",
  tintGray100: "#F3F3F5",
  background: "#FFFFFF",
  white: "#FFFFFF",
};

export const styles = StyleSheet.create({
  cardRoomContainer: {
    padding: layoutScheme.paddingVertical,
    borderRadius: layoutScheme.borderRadius,
    backgroundColor: colorScheme.background,
    flexDirection: "column",
    gap: layoutScheme.gap,
    width: layoutScheme.cardWidth,
  },
  buttonContainer: {
    color: colorScheme.white,
    backgroundColor: colorScheme.primary,
    paddingHorizontal: layoutScheme.paddingHorizontal,
    paddingVertical: layoutScheme.paddingVertical,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: layoutScheme.borderRadius,
  },
  titleText: {
    color: colorScheme.tintGray900,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "700",
  },
  subtitleText: {
    color: colorScheme.tintGray700,
    fontSize: 14,
    lineHeight: 17,
    fontWeight: "400",
  },
  smallText: {
    color: colorScheme.tintGray500,
    fontSize: 12,
    lineHeight: 14,
  },
});

export default Card;
