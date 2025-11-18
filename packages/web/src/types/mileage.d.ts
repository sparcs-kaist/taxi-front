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
