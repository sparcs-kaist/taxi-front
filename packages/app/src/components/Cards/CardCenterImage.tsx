import { Image, Text, View } from "tamagui";
import { XStack } from "tamagui";

import { TaxiButton, TaxiIconButton } from "../Button";
import type { CardProps } from "./index";
import { colorScheme, layoutScheme, styles } from "./index";

const CardCenterImage = ({
  title,
  subtitle,
  imageUrl,
  buttonLabel,
  onPress,
}: CardProps) => {
  return (
    <View flexDirection="column" gap={0}>
      <View
        padding={16}
        borderRadius={12}
        gap={8}
        width={327}
        backgroundColor="$background0"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}
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
        <View position="absolute" top={0} right={0}>
          <TaxiIconButton icon="close" onPress={() => onPress} />
        </View>
      </View>
      <Image
        height={128}
        width={327}
        backgroundColor="$color4"
        source={{ uri: imageUrl }}
      />
      <View
        padding={16}
        borderRadius={12}
        backgroundColor="$background0"
        flexDirection="column"
        gap={8}
        width={327}
        justifyContent="center"
        borderTopLeftRadius={0}
        borderTopRightRadius={0}
      >
        <TaxiButton label="레이블" onPress={() => onPress} />
      </View>
    </View>
  );
};

export default CardCenterImage;
