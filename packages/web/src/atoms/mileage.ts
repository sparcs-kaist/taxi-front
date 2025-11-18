import { MileageSummary } from "@/types/mileage";

import { atom } from "recoil";

// 앞서 정의한 타입 사용

// 초기값은 null로 설정
const mileageAtom = atom<MileageSummary | null>({
  key: "mileageAtom",
  default: null,
});

export default mileageAtom;
