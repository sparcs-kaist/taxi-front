import { ArrowRightLeft, Search, X } from "@tamagui/lucide-icons";
import { Button, Text, XStack, YStack } from "tamagui";

import Path from "./Path";

export type SearchBarProps = {
  location?: {
    from: string;
    to: string;
  };
  searchConditions?: string[];
};

const SearchBar = ({ location, searchConditions }: SearchBarProps) => {
  return (
    <XStack>
      <Button icon={location ? ArrowRightLeft : Search} />
      <YStack>
        {location && <Path from={location!.from} to={location!.to} />}
        {location && searchConditions && searchConditions.length > 0 && (
          <Text>{searchConditions.join(",")}</Text>
        )}
        {!location && <Text>어디로 갈까요?</Text>}
      </YStack>
      {location && <Button icon={X} />}
    </XStack>
  );
};

export default SearchBar;
