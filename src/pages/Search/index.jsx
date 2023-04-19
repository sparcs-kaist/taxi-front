import qs from "qs";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory, useLocation } from "react-router-dom";

import { useR2state } from "hooks/useReactiveState";
import { useAxios } from "hooks/useTaxiAPI";

import Button from "components/Button";
import {
  OptionDate,
  OptionMaxPeople,
  OptionName,
  OptionPlace,
  OptionTime,
} from "components/ModalRoomOptions";
import RLayout from "components/RLayout";
import ScrollUpButton from "components/ScrollUpButton";
import Title from "components/Title";
import Tooltip from "components/Tooltip";

import SelectSearchOptions from "./SelectSearchOptions";
import SideResult from "./SideResult";
import { isValidQuery } from "./utils";

import errorAtom from "atoms/error";
import { useSetRecoilState } from "recoil";

import moment, { getToday, getToday10 } from "tools/moment";
import theme from "tools/theme";

const Search = () => {
  const axios = useAxios();
  const [cookies, setCookie] = useCookies(["defaultFromTo"]);
  const history = useHistory();
  const { search } = useLocation();
  const reactiveState = useR2state();
  const today10 = getToday10();
  const setError = useSetRecoilState(errorAtom);

  const defaultOptions = {
    place: true,
    date: true,
    time: true,
    maxPeople: false,
    name: false,
  };
  const defaultPlace = [
    cookies?.defaultFromTo?.[0] ?? null,
    cookies?.defaultFromTo?.[1] ?? null,
  ];
  const defaultDate = [today10.year(), today10.month() + 1, today10.date()];
  const defaultTime = [today10.hour(), today10.minute()];
  const defaultMaxPeople = 4;
  const defaultName = "";

  const [searchOptions, setSearchOptions] = useState(defaultOptions);
  const [valuePlace, setPlace] = useState(defaultPlace);
  const [valueDate, setDate] = useState(defaultDate);
  const [valueTime, setTime] = useState(defaultTime);
  const [valueMaxPeople, setMaxPeople] = useState(defaultMaxPeople);
  const [valueName, setName] = useState(defaultName);

  const [searchResult, setSearchResult] = useState(null);

  const scrollRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    if (valuePlace[0] && valuePlace[1]) {
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 10);
      setCookie("defaultFromTo", valuePlace, {
        expires: expirationDate,
      });
    }
  }, [valuePlace]);

  // search query에 따라 검색 결과 설정
  useEffect(() => {
    try {
      const query = qs.parse(search.slice(1));
      if (Object.keys(query).length === 0) {
        setSearchResult(null);
        return;
      }
      if (!isValidQuery(query)) {
        throw Error("Parameter is not valid");
      }
      const newSearchOptions = {
        place: false,
        date: false,
        time: false,
        maxPeople: false,
        name: false,
      };
      if (query.place) {
        newSearchOptions.place = true;
        setPlace([query.place[0], query.place[1]]);
      }
      if (query.date) {
        newSearchOptions.date = true;
        setDate(query.date.map((x) => parseInt(x)));
      }
      if (query.time) {
        newSearchOptions.time = true;
        setTime(query.time.map((x) => parseInt(x)));
      }
      if (query.maxPeople) {
        newSearchOptions.maxPeople = true;
        setMaxPeople(parseInt(query.maxPeople));
      }
      if (query.name) {
        newSearchOptions.name = true;
        setName(query.name);
      }
      setSearchOptions(newSearchOptions);

      let time = null;
      let withTime = false;
      if (query.date) {
        time = moment();
        time.year(query.date[0]);
        time.month(query.date[1] - 1);
        time.date(query.date[2]);
      }
      if (query.time) {
        time.hour(query.time[0]);
        time.minute(query.time[1]);
        withTime = true;
      }
      const params = {
        name: query.name,
        from: query.place?.[0],
        to: query.place?.[1],
        time: time?.toISOString(),
        withTime,
        maxPartLength: query.maxPeople,
      };
      axios({
        url: "/rooms/search",
        method: "get",
        params,
        onSuccess: (data) => setSearchResult(data),
      });
    } catch (e) {
      setError({
        title: "페이지를 찾을 수 없습니다.",
        message: "올바르지 않은 방 검색 조건입니다.",
        record: null,
      });
    }
  }, [search]);

  // 검색 버튼 메시지 설정
  const [message, isDisabled] = useMemo(() => {
    if (!Object.values(searchOptions).some((option) => option)) {
      return ["빠른 출발 검색", false];
    } else if (searchOptions.name && valueName === "") {
      return ["방 이름을 입력해주세요", true];
    } else if (
      (searchOptions.place && valuePlace.some((place) => place === null)) ||
      (searchOptions.date && valueDate.some((date) => date === null)) ||
      (searchOptions.time && valueTime.some((time) => time === null))
    ) {
      return ["선택을 완료해주세요", true];
    } else if (
      searchOptions.place &&
      valuePlace[0] !== null &&
      valuePlace[1] !== null &&
      valuePlace[0] === valuePlace[1]
    ) {
      return ["출발지와 도착지는 달라야 합니다", true];
    } else if (
      searchOptions.time &
      !valueDate.some((date) => date === null) &
      moment(
        `${valueDate[0]}-${
          valueDate[1] < 10 ? "0" + valueDate[1] : valueDate[1]
        }-${valueDate[2]} ${valueTime[0]}:${valueTime[1]}`
      ).isBefore(getToday(), "minute")
    ) {
      return ["과거 시점은 검색할 수 없습니다", true];
    }
    return ["방 검색하기", false];
  }, [searchOptions, valueName, valuePlace, valueDate, valueTime]);

  // 검색 결과 생성 후 스크롤
  useEffect(() => {
    if (!searchResult || reactiveState !== 3) return;
    setTimeout(() => {
      const scrollToResult = scrollRef.current?.offsetTop + 79; // '검색 결과'의 parent 내에서의 offset + '방 검색하기'의 height
      window.scrollTo({ top: scrollToResult, behavior: "smooth" });
    }, 0);
  }, [searchResult]);

  // scroll & resize 이벤트 등록 및 해제
  useEffect(() => {
    const onScrollOrResize = () => {
      if (!searchResult && reactiveState !== 3) return;
      const scrolled =
        scrollRef.current?.getBoundingClientRect().top < window.innerHeight / 2; // 화면의 1/2 지점을 넘어설 때
      setShowScrollButton(scrolled);
    };
    window.addEventListener("scroll", onScrollOrResize);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  // 검색 버튼 클릭 시
  const onClickSearch = () => {
    const query = qs.stringify({
      place: searchOptions.place ? valuePlace : undefined,
      date: searchOptions.date ? valueDate : undefined,
      time: searchOptions.time ? valueTime : undefined,
      maxPeople: searchOptions.maxPeople ? valueMaxPeople : undefined,
      name: searchOptions.name ? valueName : undefined,
      page: 1,
    });
    history.push(`/search?${query}`);
  };

  const leftLay = (
    <>
      <div
        style={{
          color: theme.purple,
          ...theme.font14,
        }}
      >
        어떤 조건으로 검색할까요?
      </div>
      <SelectSearchOptions options={searchOptions} handler={setSearchOptions} />
      {searchOptions.place && (
        <OptionPlace value={valuePlace} handler={setPlace} />
      )}
      {searchOptions.date && <OptionDate value={valueDate} handler={setDate} />}
      {searchOptions.time && (
        <OptionTime value={valueTime} handler={setTime} page="search" />
      )}
      {searchOptions.maxPeople && (
        <OptionMaxPeople value={valueMaxPeople} handler={setMaxPeople} />
      )}
      {searchOptions.name && <OptionName value={valueName} handler={setName} />}
      <Button
        type="purple"
        disabled={isDisabled}
        padding="14px 0 13px"
        radius={12}
        font={theme.font16_bold}
        onClick={onClickSearch}
        className="scroll-to-button"
      >
        {message}
      </Button>
      {!Object.values(searchOptions).some((option) => option) && (
        <Tooltip text="검색 옵션을 선택하지 않을 경우 '빠른 출발 검색'이 가능합니다. 현재 시각에서 24시간 내의 방들이 검색됩니다." />
      )}
      {searchResult && reactiveState === 3 && (
        <div style={{ paddingTop: "30px" }} ref={scrollRef}>
          <Title icon="search_result">검색 결과</Title>
          <SideResult result={searchResult} mobile />
          {showScrollButton && <ScrollUpButton />}
        </div>
      )}
    </>
  );
  const rightLay = reactiveState !== 3 && searchResult && (
    <SideResult result={searchResult} />
  );
  return (
    <>
      <Title icon="search" header marginAuto R2={searchResult !== null}>
        방 검색하기
      </Title>
      <RLayout.R2 left={leftLay} right={rightLay} />
    </>
  );
};

export default Search;
