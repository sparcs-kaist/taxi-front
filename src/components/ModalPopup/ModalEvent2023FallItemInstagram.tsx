import { EventItem } from "types/event2023fall";

import Button from "components/Button";
import DottedLine from "components/DottedLine";
import LinkEvent2023FallInstagramStoryShare from "components/Link/LinkEvent2023FallInstagramStoryShare";
import Modal from "components/Modal";

import theme from "tools/theme";

import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

const backgroundLayerUrl =
  "https://sparcs-taxi-prod.s3.ap-northeast-2.amazonaws.com/assets/event-2023fall/instagram_background_item.png";
const stickerLayerDefaultUrl =
  "https://sparcs-taxi-prod.s3.ap-northeast-2.amazonaws.com/assets/event-2023fall/instagram_sticker.png";

type ModalEvent2023FallItemInstagramProps = { item?: EventItem } & Parameters<
  typeof Modal
>[0];

const Background = () => (
  <div css={{ position: "absolute", top: "20%", left: 0, bottom: 0, right: 0 }}>
    <div className="c2023fallevent-before"></div>
    <div className="c2023fallevent-after"></div>
  </div>
);

const ModalEvent2023FallItemInstagram = ({
  item,
  ...modalProps
}: ModalEvent2023FallItemInstagramProps) => {
  const stickerLayerUrl =
    item?.instagramStoryStickerImageUrl || stickerLayerDefaultUrl;
  console.log(modalProps.isOpen, stickerLayerUrl);

  const styleTitle = {
    ...theme.font18,
    display: "flex",
    alignItems: "center",
    margin: "0 8px 12px",
  };
  const styleIcon = {
    fontSize: "21px",
    margin: "0 4px 0 0",
  };
  const styleGuide = {
    ...theme.font12,
    color: theme.gray_text,
    margin: "0 8px 12px",
  };

  return (
    <Modal
      padding="16px 12px 12px"
      backgroundChildren={<Background />}
      {...modalProps}
    >
      <div css={styleTitle}>
        <ShareRoundedIcon style={styleIcon} />
        인스타그램 스토리에 공유하기
      </div>
      <div css={styleGuide}>
        <b css={{ color: theme.black }}>상품 획득을 축하합니다!</b> 이벤트를
        열심히 즐긴 당신. 그 상품 획득을 축하 받을 자격이 충분합니다. 인스타그램
        스토리에 상품 획득을 공유하세요.
        <b css={{ color: theme.black }}>
          인스타그램 스토리에 공유하면, 송편 100개를 획득할 수 있는 퀘스트를
          달성할 수 있습니다.
        </b>
      </div>
      <DottedLine css={{ marginBottom: "12px" }} />
      <div css={styleGuide}>
        <a
          css={{ textDecoration: "none" }}
          href="https://www.instagram.com/sparcs.kaist/"
          target="_blank"
          rel="noreferrer"
        >
          <u>
            <b css={{ color: theme.black }}>@sparcs.kaist</b>
          </u>
        </a>{" "}
        태그 부탁드려요 :D
      </div>
      <div
        css={{
          margin: "0 8px 12px",
          border: `1px solid ${theme.gray_line}`,
          borderRadius: "10px",
          height: "120px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          css={{
            width: "100%",
            marginTop: "-40%",
            height: "200%",
            objectFit: "cover",
          }}
          alt="background"
          src={backgroundLayerUrl}
        />
        <img
          css={{
            position: "absolute",
            top: "12px",
            left: "12px",
            width: "calc(100% - 24px)",
            height: "calc(100% - 24px)",
            objectFit: "contain",
          }}
          alt="sticker"
          src={stickerLayerUrl}
        />
      </div>
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="gray"
          css={{
            width: "calc(40% - 10px)",
            padding: "10px 0 9px",
            borderRadius: "8px",
            ...theme.font14,
          }}
          onClick={() => modalProps?.onChangeIsOpen?.(false)}
        >
          취소
        </Button>
        <LinkEvent2023FallInstagramStoryShare
          type="purchaseSharingOnInstagram"
          stickerLayerUrl={stickerLayerUrl}
          backgroundLayerUrl={backgroundLayerUrl}
          css={{ width: "60%" }}
        >
          <Button
            type="purple"
            css={{
              padding: "10px 0 9px",
              borderRadius: "8px",
              ...theme.font14_bold,
            }}
          >
            인스타그램에 공유하기
          </Button>
        </LinkEvent2023FallInstagramStoryShare>
      </div>
    </Modal>
  );
};

export default ModalEvent2023FallItemInstagram;
