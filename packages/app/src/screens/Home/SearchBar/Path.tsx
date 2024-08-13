import { Text, XStack } from "tamagui";

import TaxiLeadingIcon from "@/components/LeadingIcon";

export type PathProps = {
  from: string;
  to: string;
};

const Path = ({ from, to }: PathProps) => {
  return (
    <XStack>
      <Text>{from}</Text>
      <TaxiLeadingIcon name="arrow-right-alt" />
      <Text>{to}</Text>
    </XStack>
  );
};

export default Path;
