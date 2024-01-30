import { RootStackScreenProps } from "@/navigation/types";
import React from "react";

import { TaxiWebView } from "@/components/TaxiWebView";

export const Web: React.FC<RootStackScreenProps<"Web">> = ({
  route: { params },
}) => <TaxiWebView path={params.uri} />;
