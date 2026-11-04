import { Carousel } from "antd";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Footer from "@/components/Footer";
import Title from "@/components/Title";
import WhiteContainer from "@/components/WhiteContainer";

import Card1 from "@/static/assets/modalGuide/Card1.png";
import Card2 from "@/static/assets/modalGuide/Card2.png";
import Card3 from "@/static/assets/modalGuide/Card3.png";
import Card4 from "@/static/assets/modalGuide/Card4.png";
import Card5 from "@/static/assets/modalGuide/Card5.png";

type WhiteContainerCardProps = {
  src: string;
};

const WhiteContainerCard = ({ src }: WhiteContainerCardProps) => (
  <div>
    <img
      src={src}
      css={{
        margin: 0,
        width: "100%",
      }}
      alt="card1"
    />
  </div>
);

const Event2023SpringGuide = () => (
  <AdaptiveDiv type="center">
    <Title icon="taxi" isHeader>
      택시 살펴보기
    </Title>
    <WhiteContainer css={{ padding: "0" }}>
      <Carousel autoplay autoplaySpeed={5000}>
        {[Card1, Card2, Card3, Card4, Card5].map((item, index) => (
          <WhiteContainerCard src={item} key={index} />
        ))}
      </Carousel>
    </WhiteContainer>
    <Footer />
  </AdaptiveDiv>
);

export default Event2023SpringGuide;
