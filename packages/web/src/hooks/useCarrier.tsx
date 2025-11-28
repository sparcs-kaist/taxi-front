import { useCallback, useState } from "react";

import { useAxios } from "@/hooks/useTaxiAPI";

export type CarrierUser = {
  userId: string;
  name: string;
  nickname: string;
  hasCarrier: boolean;
};

type CarrierStatusResponse = {
  roomId: string;
  carriers: CarrierUser[];
};

const useCarrier = () => {
  const axios = useAxios();
  const [carrierList, setCarrierList] = useState<CarrierUser[]>([]);

  const fetchCarrierStatus = useCallback(
    async (roomId: string) => {
      if (!roomId) return;
      await axios({
        url: "/rooms/carrier/status",
        method: "get",
        params: { roomId },
        onSuccess: (data: CarrierStatusResponse) => {
          setCarrierList(data.carriers);
        },
        onError: () => {
          console.error("캐리어 현황을 불러오는데 실패했어요.");
        },
      });
    },
    [axios]
  );

  const toggleCarrier = useCallback(
    async (roomId: string, currentStatus: boolean) => {
      if (!roomId) return;
      const nextStatus = !currentStatus;

      await axios({
        url: "/rooms/carrier/toggle",
        method: "post",
        data: {
          roomId,
          hasCarrier: nextStatus,
        },
        onSuccess: () => {
          fetchCarrierStatus(roomId);
        },
        onError: () => {
          alert("캐리어 상태 변경에 실패했어요.");
        },
      });
    },
    [axios, fetchCarrierStatus]
  );

  return { carrierList, fetchCarrierStatus, toggleCarrier };
};

export default useCarrier;
