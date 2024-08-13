import { Text, XStack, YStack } from "tamagui";

import TaxiLeadingIcon from "@/components/LeadingIcon";

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
      <TaxiLeadingIcon name={location ? "sync-alt" : "search"} />
      <YStack>
        {location && <Path from={location!.from} to={location!.to} />}
        {location && searchConditions && searchConditions.length > 0 && (
          <Text>{searchConditions.join(",")}</Text>
        )}
        {!location && <Text>어디로 갈까요?</Text>}
      </YStack>
      {location ? <TaxiLeadingIcon name="close" /> : <></>}
    </XStack>
  );
};

export default SearchBar;
