import { XStack } from "tamagui";

import TaxiLeadingIcon from "@/components/LeadingIcon";

import Path from "./"

export type SearchBarProps = {
  location?: {
    from: string;
    to: string;
  };
};

const SearchBar = ({ location }: SearchBarProps) => {
  return (
    <XStack style={{
      background: "black", // TODO
      margin: "24px",
    }}>
      <TaxiLeadingIcon name={location ? "sync-alt" : "search"} />
      
    </XStack>
  );
};

export default SearchBar;
