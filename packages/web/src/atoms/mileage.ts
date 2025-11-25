import { atom } from "recoil";

// --- Types migrated from mileage.d.ts ---

// Nullable 유틸리티 타입 (loginInfo 파일의 패턴에 맞추어 정의)
export type Nullable<T> = T | null;

export type MileageTier = "gold" | "silver" | "normal" | "none";

export interface MileageSummary {
  totalMileage: number;
  activeMileage: number;
  tier: MileageTier;
}

export interface MileageTransaction {
  type: "earn" | "use" | "event" | "attendance";
  amount: number;
  createdAt: string;
  expireAt?: string;
  isExpired: boolean;
}

export interface MileageTransactionResponse {
  items: MileageTransaction[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface MileageLeaderboardItem {
  nickname: string;
  totalMileage: number;
  tier: MileageTier;
}

export type MileageLeaderboardResponse = {
  items: MileageLeaderboardItem[];
};

// -----------------------------------------

// Atom에 사용될 타입 정의
export type MileageType = Nullable<MileageSummary>;

const mileageAtom = atom<MileageType>({
  key: "mileageAtom",
  default: null,
});

export default mileageAtom;
