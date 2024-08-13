import React from "react";
import { Text, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { TaxiButtonProps, TaxiIconButtonProps } from "../../types";

import { colorScheme, layoutScheme, styles } from "../../statics/theme";

const TaxiButton = ({ label, width, onPress }: TaxiButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={{ ...styles.titleText, color: colorScheme.white }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
const TaxiIconButton = ({ icon, onPress }: TaxiIconButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        padding: layoutScheme.iconButtonPadding,
        height: layoutScheme.iconButtonSize,
        width: layoutScheme.iconButtonSize,
      }}
      onPress={onPress}
      activeOpacity={0.8}
      children={
        <MaterialIcons name="close" size={24} color={colorScheme.tintGray500} />
      }
    />
  );
};
export { TaxiButton, TaxiIconButton };
