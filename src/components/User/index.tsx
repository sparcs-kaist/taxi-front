import ProfileImg from "./ProfileImg";

import theme from "tools/theme";

type UserProps = {
  value: User;
  //   type?: "defalut" | "settlement" | "departed";
};

const User = ({ value }: UserProps) => (
  <div
    css={{
      display: "flex",
      alignItems: "center",
      gap: "4px",
      maxWidth: "100%",
    }}
  >
    <div
      css={{
        minWidth: "21px",
        height: "21px",
        overflow: "hidden",
        borderRadius: "50%",
        background: theme.gray_line,
      }}
    >
      <ProfileImg path={value.profileImageUrl} />
    </div>
    <div
      css={{
        ...theme.font10,
        borderRadius: "6px",
        padding: "4px 6px 3px",
        boxShadow: theme.shadow_gray_input_inset,
        color: theme.gray_text,
        background: theme.gray_background,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      }}
    >
      {value.nickname}
    </div>
  </div>
);

export default User;
