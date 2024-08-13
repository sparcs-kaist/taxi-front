import { Text, View } from "tamagui";

import TaxiChip from "../Chip";
import type { TaxiRoomInfoProps } from "./index";

const CardRoom = ({
  roomTitle,
  roomFrom,
  roomTo,
  roomNumPerson,
  roomMaxPerson,
  roomStartTime,
  roomTagList,
}: TaxiRoomInfoProps) => {
  return (
    <View
      padding={16}
      borderRadius={12}
      backgroundColor="$background0"
      flexDirection="column"
      gap={8}
      width={327}
    >
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="$4" color="$color8">
          {roomStartTime.getHours() <= 12 ? "오전" : "오후"}{" "}
          {roomStartTime.getHours() <= 12
            ? roomStartTime.getHours().toString().padStart(2, "0")
            : (roomStartTime.getHours() - 12).toString().padStart(2, "0")}
          :{roomStartTime.getMinutes().toString().padStart(2, "0")} 출발
        </Text>
        <View position="absolute" right={0}>
          <TaxiChip>{`${roomNumPerson} / ${roomMaxPerson}명`}</TaxiChip>
        </View>
      </View>
      <View
        flexDirection="row"
        gap={8}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Text fontSize="$7" color="$color11">
          {roomFrom.toString()}
        </Text>
        {/* TODO: arrow-right icon add */}
        <Text fontSize="$7" color="$color11">
          {roomTo.toString()}
        </Text>
      </View>
      <View flexDirection="row" justifyContent="space-between">
        <Text fontSize="$2" color="$color6">
          {roomTitle}
        </Text>
        <Text fontSize="$2" color="$color6">
          {roomTagList.join(" • ")}
        </Text>
      </View>
    </View>
  );
};

export default CardRoom;
