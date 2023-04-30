import RLayout from "components/RLayout";
import SuggestApp from "components/Suggest/SuggestApp";
import Title from "components/Title";
import WhiteContainer from "components/WhiteContainer";

// import theme from "tools/theme";

const SuggestAppSection = () => {
  return (
    <RLayout.R1>
      <Title icon="taxi" header>
        이벤트
      </Title>
      <WhiteContainer>
        <SuggestApp />
      </WhiteContainer>
    </RLayout.R1>
  );
};

export default SuggestAppSection;
