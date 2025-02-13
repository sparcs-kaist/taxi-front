import { useMemo } from "react";

import theme from "@/tools/theme";

const styleUnreadUsers = {
  ...theme.font8_medium,
  color: theme.purple_dark,
};

export default ({ value }: { value: number }) => {
  return useMemo(() => <div css={styleUnreadUsers}>{value}</div>, [value]);
};
