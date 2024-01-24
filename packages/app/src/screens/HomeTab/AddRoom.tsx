import { HomeTabScreenProps } from "@/navigation/types";
import React from "react";

import { TaxiWebView } from "@/components/TaxiWebView";

export const AddRoom: React.FC<HomeTabScreenProps<"AddRoom">> = () => (
  <TaxiWebView path="/addroom" />
);
