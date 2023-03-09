import { useState, useRef, useEffect, memo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useR2state } from "hooks/useReactiveState";
import qs from "qs";
import hoverEventSet from "tools/hoverEventSet";
import axios from "tools/axios";
import theme from "styles/theme";

import RLayout from "components/common/RLayout";
import Title from "components/common/Title";
import SideResult from "./SideResult";
import moment, { getToday10, getToday } from "tools/moment";
import PropTypes from "prop-types";
import Button from "components/common/Button";
import Tooltip from "components/common/Tooltip";
import ScrollButton from "./ScrollButton";

import OptionName from "components/common/roomOptions/Name";
import OptionPlace from "components/common/roomOptions/Place";
import OptionDate from "components/common/roomOptions/Date";
import OptionTime from "components/common/roomOptions/Time";
import OptionMaxPeople from "components/common/roomOptions/MaxPeople";

const searchQueryOption = { skipNulls: true };
const defaultOptions = { place: true, date: true, time: true };

const SearchOption = (props) => {
  const [isHover, setHover] = useState(false);
  const style = {
    ...theme.font12,
    borderRadius: "15px",
    padding: "8px 15px 7px 15px",
    boxShadow: theme.shadow,
    background: props.selected
      ? isHover
        ? theme.purple_dark
        : theme.purple
      : isHover
      ? theme.purple_hover
      : theme.white,
    color: props.selected ? theme.white : theme.black,
    config: { duration: 150 },
    ...theme.cursor(),
  };
  const onClick = () => {
    props.handler((prevState) => {
      const _options = { ...prevState };
      _options[props.id] = !props.selected;
      if (!_options.date && _options.time) {
        if (props.id === "date") _options.time = false;
        if (props.id === "time") _options.date = true;
      }
      return _options;
    });
  };
  return (
    <div style={style} onClick={onClick} {...hoverEventSet(setHover)}>
      {props.children}
    </div>
  );
};
SearchOption.propTypes = {
  children: PropTypes.string,
  id: PropTypes.string,
  selected: PropTypes.bool,
  handler: PropTypes.func,
};
const MemoizedSearchOption = memo(SearchOption);

const SelectSearchOptions = (props) => {
  const options = [
    { name: "장소", id: "place" },
    { name: "날짜", id: "date" },
    { name: "시간", id: "time" },
    { name: "최대 인원", id: "maxPeople" },
    { name: "방 이름", id: "name" },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        paddingTop: "10px",
        paddingBottom: "15px",
      }}
    >
      {options.map((item, index) => {
        const selected = props.options[item.id] ?? false;
        return (
          <MemoizedSearchOption
            key={index}
            id={item.id}
            handler={props.handler}
            selected={selected}
          >
            {item.name}
          </MemoizedSearchOption>
        );
      })}
    </div>
  );
};
SelectSearchOptions.propTypes = {
  options: PropTypes.object,
  handler: PropTypes.func,
};

const isSearchAll = (q) => {
  for (let [key, val] of Object.entries(q))
    if (key === "all" && val === "true") return true;
  return false;
};

const isValidQuery = (q) => {
  const allowedKeys = [
    "name",
    "from",
    "to",
    "time",
    "withTime",
    "maxPeople",
    "page",
  ];
  const keys = Object.keys(q);

  if (keys.length > allowedKeys.length) return false;
  if (keys.some((key) => !allowedKeys.includes(key))) return false;
  if (keys.includes("from") !== keys.includes("to")) return false;
  if (keys.includes("maxPeople") && q.maxPeople !== null) {
    const parsedInt = parseInt(q.maxPeople);
    if (isNaN(parsedInt) || parsedInt < 2 || parsedInt > 4) return false;
  }
  if (keys.includes("time") && q.time !== null) {
    if (isNaN(Date.parse(q.time))) return false;
  } else if (keys.includes("withTime") && q.withTime === "true") return false;
  return true;
};

const Search = () => {
  const reactiveState = useR2state();
  const onCall = useRef(false);
  const prevSearchParam = useRef("");
  const scrollRef = useRef(null);
  const today = useRef(getToday());
  const today10 = getToday10();
  const history = useHistory();
  const location = useLocation();

  const [cookies, setCookie] = useCookies(["defaultFromTo"]);
  const [searchOptions, setSearchOptions] = useState(defaultOptions);
  const [valueName, setName] = useState("");
  const defaultPlace =
    cookies?.defaultFromTo?.[0] && cookies?.defaultFromTo?.[1]
      ? cookies.defaultFromTo
      : [null, null];
  const [valuePlace, setPlace] = useState(defaultPlace);
  const [valueDate, setDate] = useState([null, null, null]);
  const [valueTime, setTime] = useState([today10.hour(), today10.minute()]);
  const [valueMaxPeople, setMaxPeople] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState("검색 조건을 선택해주세요");
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 10);
    if (valuePlace[0] && valuePlace[1]) {
      setCookie("defaultFromTo", valuePlace, {
        expires: expirationDate,
      });
    }
  }, [valuePlace]);

  const clearState = () => {
    onCall.current = false;
    setSearchOptions(defaultOptions);
    setName("");
    setPlace(defaultPlace);
    setDate([
      today.current.year(),
      today.current.month() + 1,
      today.current.date(),
    ]);
    setTime([today10.hour(), today10.minute()]);
    setMaxPeople(null);
    setSearchResult(null);
    setDisabled(true);
    setMessage("검색 조건을 선택해주세요");
  };

  const setStatesFromQuery = (q) => {
    const newSearchOptions = { ...searchOptions };
    const entries = Object.entries(q);
    for (let [key, val] of entries) {
      if (key === "name" && val !== null) newSearchOptions.name = true;
      if (key === "from" && val !== null) newSearchOptions.place = true;
      if (key === "time" && val !== null) newSearchOptions.date = true;
      if (key === "withTime" && val === "true") newSearchOptions.time = true;
      if (key === "maxPeople" && val !== null)
        newSearchOptions.maxPeople = true;
    }
    setSearchOptions(newSearchOptions);
    if (newSearchOptions.name) setName(q.name);
    if (newSearchOptions.place) setPlace([q.from, q.to]);
    if (newSearchOptions.date) {
      const queryTime = moment(q.time);
      setDate([queryTime.year(), queryTime.month() + 1, queryTime.date()]);
      if (newSearchOptions.time)
        setTime([queryTime.hour(), Math.floor(queryTime.minute() / 10) * 10]);
    }
    if (newSearchOptions.maxPeople) setMaxPeople(Number(q.maxPeople));
  };

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

  useEffect(() => {
    const q = qs.parse(location.search.slice(1), searchQueryOption);

    if (Object.keys(q).length === 0) {
      clearState();
      return;
    }

    const searchParamWithoutPage = qs.stringify({ ...q, page: null });
    if (prevSearchParam.current === searchParamWithoutPage) return;
    prevSearchParam.current = searchParamWithoutPage;

    if (isSearchAll(q)) {
      axios
        .get("rooms/search")
        .then((res) => {
          setSearchResult(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (isValidQuery(q)) {
      setStatesFromQuery(q);
      if (q.maxPeople) {
        delete Object.assign(q, { maxPartLength: q.maxPeople }).maxPeople;
      }
      axios
        .get("rooms/search", {
          params: q,
        })
        .then((res) => {
          setSearchResult(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      history.replace("/search");
    }
  }, [JSON.stringify(location)]);

  useEffect(() => {
    if (!Object.values(searchOptions).some((option) => option)) {
      setMessage("빠른 출발 검색");
      setDisabled(false);
    } else if (searchOptions.name && valueName === "") {
      setMessage("방 이름을 입력해주세요");
      setDisabled(true);
    } else if (
      (searchOptions.place && valuePlace.some((place) => place === null)) ||
      (searchOptions.date && valueDate.some((date) => date === null)) ||
      (searchOptions.time && valueTime.some((time) => time === null))
    ) {
      setMessage("선택을 완료해주세요");
      setDisabled(true);
    } else if (
      (valuePlace[0] !== null || valuePlace[1] !== null) &&
      valuePlace[0] === valuePlace[1]
    ) {
      setMessage("출발지와 도착지는 달라야 합니다");
      setDisabled(true);
    } else if (
      searchOptions.time &
      !valueDate.some((date) => date === null) &
      moment(
        `${valueDate[0]}-${
          valueDate[1] < 10 ? "0" + valueDate[1] : valueDate[1]
        }-${valueDate[2]} ${valueTime[0]}:${valueTime[1]}`
      ).isBefore(getToday(), "minute")
    ) {
      setMessage("과거 시점은 검색할 수 없습니다.");
      setDisabled(true);
    } else {
      setMessage("방 검색하기");
      setDisabled(false);
    }
  }, [searchOptions, valueName, valuePlace, valueDate, valueTime]);

  useEffect(() => {
    if (!searchOptions.name && valueName.length > 0) setName("");
  }, [searchOptions.name]);
  useEffect(() => {
    if (
      !searchOptions.place &&
      (valuePlace[0] !== null || valuePlace[1] !== null)
    )
      setPlace(defaultPlace);
  }, [searchOptions.place]);
  useEffect(() => {
    if (!searchOptions.date && valueDate[0] !== null)
      setDate([null, null, null]);
    if (searchOptions.date) {
      today.current = getToday();
      setDate([
        today.current.year(),
        today.current.month() + 1,
        today.current.date(),
      ]);
    }
  }, [searchOptions.date]);
  useEffect(() => {
    if (searchOptions.time) {
      if (valueTime[0] === 0 && valueTime[1] === 0) {
        const today = getToday10();
        setTime([today.hour(), today.minute()]);
      }
    } else if (valueTime[0] !== 0 || valueTime[1] !== 0) {
      setTime([today10.hour(), today10.minute()]);
    }
  }, [searchOptions.time]);
  useEffect(() => {
    if (searchOptions.maxPeople) {
      if (valueMaxPeople === null) setMaxPeople(4);
    } else if (valueMaxPeople !== null) setMaxPeople(null);
  }, [searchOptions.maxPeople]);

  const onClickSearch = async () => {
    if (!onCall.current) {
      onCall.current = true;
      setSearchResult([]);
    }

    if (!Object.values(searchOptions).some((option) => option)) {
      history.push("/search?all=true");
    } else {
      let withTime = false;
      let date = null;
      if (searchOptions.date && valueDate[0] !== null) {
        date = moment();
        date.year(valueDate[0]);
        date.month(valueDate[1] - 1);
        date.date(valueDate[2]);
      }
      if (searchOptions.time) {
        date.hour(valueTime[0]);
        date.minute(valueTime[1]);
        withTime = true;
      }
      const q = qs.stringify(
        {
          name: valueName.length ? valueName : null,
          from: valuePlace[0],
          to: valuePlace[1],
          time: date?.toISOString(),
          withTime,
          maxPeople: valueMaxPeople,
        },
        searchQueryOption
      );
      history.push(`/search?${q}`);
    }
  };

  useEffect(() => {
    if (!onCall.current || reactiveState !== 3) return;
    setTimeout(() => {
      const scrollToResult = scrollRef.current?.offsetTop + 79; // '검색 결과'의 parent 내에서의 offset + '방 검색하기'의 height
      window.scrollTo({ top: scrollToResult, behavior: "smooth" });
    }, 0);
  }, [searchResult]);

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
        disabled={disabled}
        padding="14px 0 13px"
        radius={12}
        font={theme.font16_bold}
        onClick={onClickSearch}
        className="scroll-to-button"
      >
        {message}
      </Button>
      {!Object.values(searchOptions).some((option) => option) && (
        <Tooltip
          text={
            "검색 옵션을 선택하지 않을 경우 '빠른 출발 검색'이 가능합니다. 현재 시각에서 24시간 내의 방들이 검색됩니다."
          }
        />
      )}
      {searchResult && reactiveState === 3 && (
        <div style={{ paddingTop: "30px" }} ref={scrollRef}>
          <Title icon="search_result">검색 결과</Title>
          <SideResult result={searchResult} mobile />
          {showScrollButton && <ScrollButton />}
        </div>
      )}
    </>
  );
  const rightLay = reactiveState !== 3 && searchResult && (
    <SideResult result={searchResult} />
  );
  return (
    <div>
      <Title icon="search" header marginAuto R2={searchResult !== null}>
        방 검색하기
      </Title>
      <RLayout.R2 left={leftLay} right={rightLay} />
    </div>
  );
};

export default Search;
