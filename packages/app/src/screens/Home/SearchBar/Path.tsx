import { ArrowRight } from "@tamagui/lucide-icons";
import { Button, Text, XStack } from "tamagui";

export type PathProps = {
  from: string;
  to: string;
};

const Path = ({ from, to }: PathProps) => {
  return (
    <XStack>
      <Text>{from}</Text>
      <Button icon={ArrowRight} />
      <Text>{to}</Text>
    </XStack>
  );
};

export default Path;
