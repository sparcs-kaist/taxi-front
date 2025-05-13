import { useCallback, useRef } from "react";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";
import { useFetchFavoriteRoutes } from "@/hooks/useFetchRecoilState/useFetchFavoriteRoutes";
import { useAxios } from "@/hooks/useTaxiAPI";

import FavoriteRouteItem from "./items/favoriteRouteItem";

import alertAtom from "@/atoms/alert";
import { FavoriteRouteType } from "@/atoms/favoriteRoutes";
import { useSetRecoilState } from "recoil";

import theme from "@/tools/theme";

type favoriteRouteProps = {
  placeValues: string[]; // [newFrom: string, newTo: string] : 장소 선택 칸에 입력된 두 위치를 상위 컴포넌트에서 state로 관리하며 props로 전달
};

const FavoriteRoutes = ({ placeValues }: favoriteRouteProps) => {
  const styleTop: CSS = {
    display: "flex",
    alignItems: "center",
    margin: "8px 0 16px 8px",
    ...theme.font16_bold,
    columnGap: "8px",
  };
  const favoriteRoutes = useValueRecoilState("favoriteRoutes") || [];
  const isAxiosCalled = useRef(false);
  const axios = useAxios();
  const fetchFavoriteRoutes = useFetchFavoriteRoutes();
  const setAlert = useSetRecoilState(alertAtom);

  const onCreateFavorite = useCallback(
    async (from: string, to: string) => {
      if (isAxiosCalled.current) return;
      isAxiosCalled.current = true;
      const data = {
        from: from,
        to: to,
      };
      await axios({
        url: "/users/createFavorite",
        method: "post",
        data,
        onError: (error: any) => {
          if (
            error.response?.status === 400 &&
            error.response?.data?.error ===
              "Users/createFavorite: route already exists"
          ) {
            setAlert("이미 존재하는 경로입니다.");
          } else if (
            error.response?.status === 400 &&
            error.response?.data?.error ===
              "Users/createFavorite: Location not found"
          ) {
            setAlert("올바른 경로를 입력해 주세요.");
          }
          {
            setAlert("즐겨찾기 추가에 실패하였습니다.");
          }
        },
      }).then(() => {
        fetchFavoriteRoutes();
        isAxiosCalled.current = false;
      });
    },
    [fetchFavoriteRoutes, isAxiosCalled]
  );

  const onDeleteFavorite = useCallback(
    async (favoriteRouteId: string) => {
      if (isAxiosCalled.current) return;
      isAxiosCalled.current = true;
      await axios({
        url: `/users/deleteFavorite/${favoriteRouteId}`,
        method: "post",
        onError: (error: any) => {
          setAlert("즐겨찾기 삭제에 실패하였습니다.");
        },
      }).then(() => {
        fetchFavoriteRoutes();
        isAxiosCalled.current = false;
      });
    },
    [fetchFavoriteRoutes, isAxiosCalled]
  );

  return (
    <div>
      <div
        style={styleTop}
        onClick={() => {
          onCreateFavorite(placeValues[0], placeValues[1]);
        }}
      >
        테스트용 추가 버튼
      </div>
      {favoriteRoutes.data.map((route: FavoriteRouteType) => (
        <FavoriteRouteItem
          key={route._id}
          onDelete={onDeleteFavorite}
          {...route}
        ></FavoriteRouteItem>
      ))}
    </div>
  );
};

export default FavoriteRoutes;
