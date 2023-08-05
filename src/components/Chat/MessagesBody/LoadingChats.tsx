import Loading from "components/Loading";

const LoadingChats = () => (
  <div
    css={{
      position: "absolute",
      top: "0px",
      left: "0px",
      right: "0px",
      bottom: "0px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Loading />
  </div>
);

export default LoadingChats;
