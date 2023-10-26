import theme from "@/tools/theme";

import ProfileImage from "./ProfileImage";

type UserProps = { value: User; isDeparted?: boolean };

const User = ({ value, isDeparted }: UserProps) => {
  const isSettlement =
    value?.isSettlement === "paid" || value?.isSettlement === "sent";
  return (
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
        <ProfileImage url={value.profileImageUrl} />
      </div>
      <div
        css={{
          ...theme.font10,
          borderRadius: "6px",
          padding: "4px 6px 3px",
          boxShadow: theme.shadow_gray_input_inset,
          color: isDeparted && isSettlement ? theme.white : theme.gray_text,
          background:
            isDeparted && isSettlement ? theme.purple : theme.gray_background,
          ...theme.ellipsis,
        }}
      >
        {value.nickname}
        {isDeparted && !isSettlement && (
          <span style={theme.font8}>(미정산)</span>
        )}
      </div>
    </div>
  );
};

export default User;
