import Modal from "@/components/Modal";

import theme from "@/tools/theme";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

type ModalArrivalStatusProps = Omit<
  Parameters<typeof Modal>[0],
  "padding" | "children"
> & { roomInfo: Room };

const ModalArrivalStatus = ({
  roomInfo,
  ...modalProps
}: ModalArrivalStatusProps) => {
  const styleTitle = {
    ...theme.font18,
    display: "flex",
    alignItems: "center",
    margin: "0 8px 12px",
  };
  const styleIcon = {
    fontSize: "21px",
    margin: "0 4px 0 0",
  };

  return (
    <Modal {...modalProps} padding="16px 12px 12px">
      <div css={styleTitle}>
        <CheckRoundedIcon style={styleIcon} />
        도착 현황
      </div>
      <div css={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {roomInfo.part.map((user) => (
          <div
            key={user._id}
            css={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 12px",
              borderRadius: "8px",
              background: theme.gray_background,
            }}
          >
            <div
              css={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flex: 1,
                minWidth: 0,
              }}
            >
              <img
                src={user.profileImageUrl}
                alt={user.nickname}
                css={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
              <span
                css={{
                  ...theme.font14,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user.nickname}
              </span>
            </div>
            <div
              css={{
                ...theme.font12_bold,
                color: user.isArrived ? theme.purple : theme.gray_text,
                display: "flex",
                alignItems: "center",
                gap: "4px",
                flexShrink: 0,
                whiteSpace: "nowrap",
                marginLeft: "12px",
              }}
            >
              {user.isArrived ? (
                <>
                  <CheckRoundedIcon style={{ fontSize: "16px" }} />
                  도착
                </>
              ) : (
                "미도착"
              )}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ModalArrivalStatus;
