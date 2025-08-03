interface UnreadBadgeProps {
  count?: number;
}

const UnreadBadge = ({ count }: UnreadBadgeProps) => {
  if (!count || count <= 0) return null;

  return (
    <span
      style={{
        backgroundColor: "red",
        color: "white",
        borderRadius: "12px",
        padding: "2px 8px",
        fontSize: "12px",
        fontWeight: "bold",
        minWidth: "20px",
        textAlign: "center",
        display: "inline-block",
      }}
    >
      {count}
    </span>
  );
};

export default UnreadBadge;
