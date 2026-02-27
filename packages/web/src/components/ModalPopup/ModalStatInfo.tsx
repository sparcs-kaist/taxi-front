import { Dispatch, SetStateAction } from "react";

import Button from "@/components/Button";
import Modal from "@/components/Modal";

import theme from "@/tools/theme";

import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";

type ModalStatInfoProps = {
  isOpen: boolean;
  onChangeIsOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalStatInfo = ({ isOpen, onChangeIsOpen }: ModalStatInfoProps) => {
  return (
    <Modal isOpen={isOpen} onChangeIsOpen={onChangeIsOpen}>
      <div css={{ padding: "24px 20px 24px" }}>
        {/* 감성 문구 */}
        <div css={{ marginBottom: "32px", textAlign: "left" }}>
          <div
            css={{
              ...theme.font16_bold,
              color: theme.purple,
              marginBottom: "8px",
              lineHeight: "1.4",
            }}
          >
            생각보다 숫자가 커서 놀라셨나요? 😮
          </div>
          <div
            css={{ ...theme.font14, color: theme.gray_text, lineHeight: "1.6" }}
          >
            이용자 수가 많을수록 이익이 극대화되는
            <br />
            Taxi의 특성을 고려한다면
            <br />
            충분히 의미 있는 데이터랍니다.
          </div>
        </div>

        {/* 섹션 1: 계산 방식 */}
        <div css={{ marginBottom: "20px" }}>
          <div
            css={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
              gap: "8px",
            }}
          >
            <MonetizationOnRoundedIcon
              css={{ width: "24px", color: theme.purple }}
            />
            <div css={{ ...theme.font16_bold, color: theme.black }}>
              아낀 금액 계산 방식
            </div>
          </div>
          <div
            css={{
              ...theme.font14,
              color: theme.black,
              lineHeight: "1.6",
              paddingLeft: "15px",
            }}
          >
            완료된 택시팟의 개인 이익 금액을 전부 합산합니다.
            <div
              css={{
                fontSize: "12px",
                color: theme.gray_text,
                marginTop: "6px",
                lineHeight: "1.4",
              }}
            >
              * (예상 택시비 - 예상 택시비 / 탑승 인원) × (탑승 인원)
            </div>
            <div
              css={{
                fontSize: "12px",
                color: theme.gray_text,
                marginTop: "3px",
                lineHeight: "1.4",
              }}
            >
              ex) 예상 택시비 10,000원 | 탑승 인원 4명인 택시팟
              <br />
              {">>"} 인당 7,500원의 이익 발생, 총 30,000원의 절약
            </div>
          </div>
        </div>

        {/* 섹션 2: 환산 기준 */}
        <div css={{ marginBottom: "40px" }}>
          <div
            css={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              gap: "8px",
            }}
          >
            <RestaurantRoundedIcon
              css={{ width: "24px", color: theme.purple }}
            />
            <div css={{ ...theme.font16_bold, color: theme.black }}>
              물가 환산 기준
            </div>
          </div>

          <div css={{ paddingLeft: "14px" }}>
            <div
              css={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div css={{ ...theme.font14, color: theme.black }}>
                🍗 치킨 1마리
              </div>
              <div css={{ ...theme.font14_bold, color: theme.purple }}>
                18,000원
              </div>
            </div>
            <div
              css={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div css={{ ...theme.font14, color: theme.black }}>
                🍪 튀김소보로 1개
              </div>
              <div css={{ ...theme.font14_bold, color: theme.purple }}>
                1,800원
              </div>
            </div>
          </div>
        </div>

        <Button
          type="purple"
          css={{
            borderRadius: "12px", // 둥글기 살짝 줄여서 단정하게
            height: "35px", // 높이를 45px로 줄여서 슬림하게
            width: "100%",
            fontSize: "15px", // 글자 크기도 밸런스 맞춤
            fontWeight: "700",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: "1", // 줄 높이 초기화해서 위로 뜨는 것 방지
            padding: "0", // 내부 패딩 제거 (flex로 정렬하니까 필요 없음)
          }}
          onClick={() => onChangeIsOpen(false)}
        >
          그렇군요!
        </Button>
      </div>
    </Modal>
  );
};

export default ModalStatInfo;
