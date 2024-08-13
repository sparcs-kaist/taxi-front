import { Text, View } from "tamagui";

const TaxiChip = (children: any) => {
  return (
    <View
      borderColor="$color4"
      borderWidth={1}
      borderRadius={6}
      paddingHorizontal={8}
      paddingVertical={6}
    >
      <Text fontSize="$2" color="$deepPurple600">
        {children}
      </Text>
    </View>
  );
};
export default TaxiChip;
