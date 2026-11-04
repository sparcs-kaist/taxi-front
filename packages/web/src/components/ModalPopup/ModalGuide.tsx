import { Carousel } from "antd";

import Button from "@/components/Button";
import Modal from "@/components/Modal";

import theme from "@/tools/theme";

import Card1 from "@/static/assets/modalGuide/Card1.png";
import Card2 from "@/static/assets/modalGuide/Card2.png";
import Card3 from "@/static/assets/modalGuide/Card3.png";
import Card4 from "@/static/assets/modalGuide/Card4.png";
import Card5 from "@/static/assets/modalGuide/Card5.png";

type WhiteContainerCardProps = {
  src: string;
};

const WhiteContainerCard = ({ src }: WhiteContainerCardProps) => (
  <div
    css={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    }}
  >
    <img
      src={src}
      css={{
        margin: 0,
        width: "100%",
        height: "auto",
        display: "block",
      }}
      alt="guide image"
    />
  </div>
);

const CustomArrow = (props: any) => {
  const { className, style, onClick, direction } = props;
  return (
    <div
      className={`custom-arrow ${className}`}
      onClick={onClick}
      css={{
        ...style,
        zIndex: 2,
        [direction === "left" ? "left" : "right"]: "16px",
        width: "36px",
        height: "36px",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        "&::before": {
          display: "none",
        },
      }}
    ></div>
  );
};

type ModalGuideProps = {
  isOpen: boolean;
  onChangeIsOpen: (isOpen: boolean) => void;
};

const ModalGuide = ({ isOpen, onChangeIsOpen }: ModalGuideProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onChangeIsOpen={() => onChangeIsOpen(false)}
      width="400px"
      padding="0"
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          overflow: "hidden",
          position: "relative",
          backgroundColor: "#fff",
        }}
      >
        <div
          css={{
            "&:hover .custom-arrow": {
              opacity: 1,
            },
          }}
        >
          <Carousel
            autoplay
            autoplaySpeed={5000}
            dots={{ className: "guide-carousel-dots" }}
            arrows
            prevArrow={<CustomArrow direction="left" />}
            nextArrow={<CustomArrow direction="right" />}
          >
            {[Card1, Card2, Card3, Card4, Card5].map((item, index) => (
              <WhiteContainerCard src={item} key={index} />
            ))}
          </Carousel>
        </div>

        <Button
          type="purple"
          css={{
            margin: "16px",
            padding: "12px",
            borderRadius: "8px",
            ...theme.font14_bold,
          }}
          onClick={() => onChangeIsOpen(false)}
        >
          시작하기
        </Button>
      </div>
    </Modal>
  );
};

export default ModalGuide;
