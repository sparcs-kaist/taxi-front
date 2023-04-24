import User from ".";

type UsersProps = {
  values: Array<User>;
};

const Users = ({ values }: UsersProps) => (
  <div
    css={{
      display: "flex",
      flexWrap: "wrap",
      gap: "6px 8px",
      overflow: "hidden",
    }}
  >
    {values.map((value) => (
      <User key={value._id} value={value} />
    ))}
  </div>
);

export default Users;
