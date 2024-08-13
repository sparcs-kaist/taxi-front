import type { ButtonProps } from "components/Cards";
import { Button } from "tamagui";

const TaxiButton = ({ label, width, onPress }: ButtonProps) => {
  return (
    <Button
      margin={16}
      paddingHorizontal={24}
      paddingVertical={16}
      alignItems="center"
      justifyContent="center"
      borderRadius={12}
      backgroundColor="$deepPurple600"
      color="$white0"
      onPress={onPress}
    >
      {label}
    </Button>
  );
};

export { TaxiButton };
