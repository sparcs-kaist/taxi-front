import BadgeImage from "./BadgeImage";
import ProfileImage from "./ProfileImage";

import theme from "@/tools/theme";

import LuggageIcon from "@mui/icons-material/Luggage";

type Participant = User & {
  withCarrier?: boolean;
};
type UserProps = { value: Participant; isDeparted?: boolean };

const User = ({ value, isDeparted }: UserProps) => {
  const isSettlement =
    value?.isSettlement === "paid" || value?.isSettlement === "sent";
  const isWithdrew = value?.withdraw;
  const hasCarrier = value.hasCarrier || value.withCarrier;
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
        <ProfileImage url={value.profileImageUrl} withdraw={isWithdrew} />
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
        <span css={{ textDecoration: isWithdrew ? "line-through" : undefined }}>
          {value.nickname}
        </span>
        {isDeparted && !isSettlement && (
          <span style={theme.font8}>{" (미정산)"}</span>
        )}
        {isWithdrew && <span style={theme.font8}>{" (탈퇴)"}</span>}
      </div>
      {hasCarrier && (
        <div
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "1px", 
          }}
          title="캐리어 소지"
        >
          <LuggageIcon
            style={{
              fontSize: "15px",
              color: theme.purple,
            }}
          />
        </div>
      )}

      <BadgeImage badge_live={value.badge || false} />
    </div>
  );
};
export default User;
