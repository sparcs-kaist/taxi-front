import AdaptiveDiv from "@/components/AdaptiveDiv";
import Footer from "@/components/Footer";
import Title from "@/components/Title";
import WhiteContainer from "@/components/WhiteContainer";
import Card05 from "@/static/events/2023springCard05.png";
import Card06 from "@/static/events/2023springCard06.png";
import Card07 from "@/static/events/2023springCard07.png";
import Card08 from "@/static/events/2023springCard08.png";
import Card09 from "@/static/events/2023springCard09.png";
import Card10 from "@/static/events/2023springCard10.png";
import { Carousel } from "antd";

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
        {[Card05, Card06, Card07, Card08, Card09, Card10].map((item, index) => (
          <WhiteContainerCard src={item} key={index} />
        ))}
      </Carousel>
    </WhiteContainer>
    <Footer />
  </AdaptiveDiv>
);

export default Event2023SpringGuide;
