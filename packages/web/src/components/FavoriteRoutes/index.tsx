import { useCallback, useRef } from "react";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";
import { useFetchFavoriteRoutes } from "@/hooks/useFetchRecoilState/useFetchFavoriteRoutes";
import { useAxios } from "@/hooks/useTaxiAPI";

import FavoriteRouteItem from "./items/favoriteRouteItem";

import alertAtom from "@/atoms/alert";
import { FavoriteRouteType } from "@/atoms/favoriteRoutes";
import { useSetRecoilState } from "recoil";

import theme from "@/tools/theme";
import Button from "../Button";

type favoriteRouteProps = {
  placeValues: string[];
  handler: (place: string[]) => void;
};

const FavoriteRoutes = ({ placeValues, handler }: favoriteRouteProps) => {
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
        onSuccess: () => {
          fetchFavoriteRoutes();
        },
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
          } else {
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
      <Button
        type="purple"
        css={{
          width: "100%",
          padding: "8px 0 7px",
          borderRadius: "8px",
          ...theme.font14_bold,
          marginBottom: "12px",
          marginTop: "8px"
        }}
        onClick={() => {
          if (placeValues[0] && placeValues[1]) {
            onCreateFavorite(placeValues[0], placeValues[1]);
          } else {
            setAlert("출발지와 도착지를 모두 선택해주세요.");
          }
        }}
      >
        현재 경로 추가하기
      </Button>
      {favoriteRoutes.data.length > 0 ? (
        favoriteRoutes.data.map((route: FavoriteRouteType) => (
          <FavoriteRouteItem
            key={route._id}
            _id={route._id}
            from={route.from}
            to={route.to}
            onDelete={onDeleteFavorite}
            handler={handler}
          />
        ))
      ) : (
        <div
          css={{
            textAlign: "center",
            padding: "10px",
            ...theme.font14,
            color: theme.gray_text,
          }}
        >
          즐겨찾는 경로가 없습니다.
        </div>
      )}
    </div>
  );
};

export default FavoriteRoutes;