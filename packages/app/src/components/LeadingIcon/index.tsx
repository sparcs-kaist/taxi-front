import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { View } from "tamagui";

import { colorScheme, layoutScheme } from "../../statics/theme";

type TaxiLeadingIconProps = {
  name: string;
};
const TaxiLeadingIcon = ({ name }: TaxiLeadingIconProps) => {
  return (
    <View
      style={{
        padding: layoutScheme.leadingIconContainerPadding,
        height: layoutScheme.leadingIconContainerSize,
        width: layoutScheme.leadingIconContainerSize,
        backgroundColor: colorScheme.tintGray100,
        justifyContent: "center",
        borderRadius: layoutScheme.leadingIconContainerSize,
      }}
    >
      <MaterialIcons
        name={name}
        size={layoutScheme.iconSize}
        color={colorScheme.tintGray500}
      />
    </View>
  );
};
export default TaxiLeadingIcon;
