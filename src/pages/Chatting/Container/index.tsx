type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => (
  <div
    css={{
      width: "100%",
      height: "100%",
      position: "absolute",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      top: "0px",
      left: "0px",
    }}
  >
    {children}
  </div>
);

export default Container;
