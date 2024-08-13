import { TaxiIconButton } from "components/Button";
import { Text, View } from "tamagui";

import type { CardProps } from "./index";

const CardOnlyText = ({ title, subtitle, onPress }: CardProps) => {
  return (
    <View
      paddingVertical={18}
      paddingHorizontal={16}
      paddingRight={0}
      borderRadius={12}
      gap={8}
      width={327}
      backgroundColor="$background0"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      <View
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        gap={8}
      >
        <Text fontSize="$7" color="$color11">
          {title}
        </Text>
        <Text fontSize="$2" color="$color6">
          {subtitle}
        </Text>
      </View>
      <View position="absolute" right={0}>
        <TaxiIconButton icon="close" onPress={() => onPress} />
      </View>
    </View>
  );
};

export default CardOnlyText;
