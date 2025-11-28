import HeaderWithLeftNav from "@/components/Header/HeaderWithLeftNav";

const Store = () => {
  return (
    <>
      <HeaderWithLeftNav
        value="store"
        options={[
          {
            value: "main",
            label: "메인",
            to: "/game/main",
          },
          {
            value: "store",
            label: "상점",
            to: "/game/store",
          },
          {
            value: "money",
            label: "돈 벌기",
            to: "/game/money",
          },
        ]}
      />
    </>
  );
};

export default Store;
