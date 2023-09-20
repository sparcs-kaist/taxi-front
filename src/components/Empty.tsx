import { HTMLProps, ReactNode } from "react";

import theme from "tools/theme";

import NotInterestedIcon from "@material-ui/icons/NotInterested";

type EmptyProps = {
  type: "mobile" | "pc";
  children?: ReactNode;
  className?: string;
} & HTMLProps<HTMLDivElement>;

const Empty = ({ type, children, className, ...divProps }: EmptyProps) => {
  const styleCommon = {
    display: "flex",
    justifyContent: "center",
    ...theme.font14_bold,
    color: theme.gray_text,
    columnGap: "6px",
  };
  const styleMobile = {
    ...styleCommon,
    padding: "24px 0",
    borderRadius: "12px",
    backgroundColor: theme.gray_background,
    border: "0.25px solid " + theme.gray_line,
  };
  const stylePC = {
    ...styleCommon,
    padding: "48px 0 26px",
  };

  return (
    <div
      css={type === "pc" ? stylePC : styleMobile}
      className={className}
      {...divProps}
    >
      <NotInterestedIcon style={{ fontSize: "16px" }} />
      {children}
    </div>
  );
};

export default Empty;
