import { useEffect, useRef } from "react";
import { useValueRecoilState } from "@/hooks/useFetchRecoilState";
import toast from "@/tools/toast";

export const useGameEffect = () => {
  const gameInfo = useValueRecoilState("gameInfo");
  const prevCreditRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!gameInfo) return;

    const prevCredit = prevCreditRef.current;
    const currentCredit = gameInfo.creditAmount;

    if (typeof prevCredit === "number" && typeof currentCredit === "number") {
      const diff = currentCredit - prevCredit;
      if (diff > 0) {
        const notificationValue = {
          type: "default" as const,
          title: "넙죽코인 획득!",
          subtitle: "택시 강화하기",
          content:
            `넙죽코인을 ${diff}개 획득하셨습니다.`
            };
        toast(notificationValue);
      }
    }

    prevCreditRef.current = currentCredit;
  }, [gameInfo?.creditAmount]);
};