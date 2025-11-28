import HeaderWithLeftNav from "@/components/Header/HeaderWithLeftNav";
import Footer from "@/components/Footer";

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
      <Footer type="game" />
      
    </>
  );
};

export default Store;
