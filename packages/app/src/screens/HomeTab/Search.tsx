import { HomeTabScreenProps } from "@/navigation/types";
import React from "react";

import { TaxiWebView } from "@/components/TaxiWebView";

export const Search: React.FC<HomeTabScreenProps<"Search">> = () => (
  <TaxiWebView path="/search" />
);
