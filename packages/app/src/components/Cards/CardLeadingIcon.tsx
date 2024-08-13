import { Cross } from "@tamagui/lucide-icons";
import { Button, Text, View } from "tamagui";

import TaxiLeadingIcon from "../LeadingIcon";
import type { CardProps } from "./index";

const CardLeadingIcon = ({
  title,
  subtitle,
  leadingIcon,
  onPress,
}: CardProps) => {
  return (
    <View
      paddingVertical={18}
      paddingHorizontal={16}
      paddingRight={0}
      borderRadius={12}
      gap={8}
      width={327}
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
      backgroundColor="$background0"
    >
      <TaxiLeadingIcon name={leadingIcon!} />
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
        <Button icon={Cross} size={24} color="$color4" />
      </View>
    </View>
  );
};
export default CardLeadingIcon;
