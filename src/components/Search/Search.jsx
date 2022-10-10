import React, { useState, useRef, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import { useHistory, useLocation } from "react-router-dom";
import qs from "qs";
import { useR2state } from "hooks/useReactiveState";
import RLayout from "components/common/RLayout";
import Title from "components/common/Title";
import SideResult from "./SideResult";
import axios from "tools/axios";
import moment, { getToday10, getToday } from "tools/moment";
import PropTypes from "prop-types";
import isMobile from "ismobilejs";
import { theme } from "styles/theme";
import Button from "components/common/Button";
import Tooltip from "components/common/Tooltip";

import OptionName from "components/common/roomOptions/Name";
import OptionPlace from "components/common/roomOptions/Place";
import OptionDate from "components/common/roomOptions/Date";
import OptionTime from "components/common/roomOptions/Time";
import OptionMaxPart from "components/common/roomOptions/MaxPart";

const searchQueryOption = { strictNullHandling: true };

const SearchOption = (props) => {
  const [isHover, setHover] = useState(false);
  const style = useSpring({
    height: "15px",
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
    fontSize: "12px",
    config: { duration: 150 },
  });
  return (
    <animated.div
      style={style}
      className="BTNC ND"
      onClick={() => props.onClick(props.id)}
      onMouseEnter={() => setHover(!(isMobile().phone || isMobile().tablet))}
      onMouseLeave={() => setHover(false)}
    >
      {props.children}
    </animated.div>
  );
};
SearchOption.propTypes = {
  children: PropTypes.string,
  id: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

const SelectSearchOptions = (props) => {
  const options = [
    { name: "방 이름", id: "name" },
    { name: "장소", id: "place" },
    { name: "날짜", id: "date" },
    { name: "시간", id: "time" },
    { name: "최대 인원", id: "maxPartLength" },
  ];
  if (props.options.time && !props.options.date) {
    props.handler({ ...props.options, date: true });
  }
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
        const selected = props.options[item.id] ? true : false;
        const onClick = (id) => {
          const _options = { ...props.options };
          _options[item.id] = !selected;
          if (id == "date" && _options.date == false && _options.time == true) {
            _options.time = false;
          }
          props.handler(_options);
        };
        return (
          <SearchOption
            key={index}
            id={item.id}
            onClick={onClick}
            selected={selected}
          >
            {item.name}
          </SearchOption>
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
  const entries = Object.entries(q);
  if (
    entries.length === 1 &&
    entries[0][0] === "all" &&
    entries[0][1] === "true"
  )
    return true;
  return false;
};

const isValidQuery = (q) => {
  const allowedKeys = [
    "name",
    "from",
    "to",
    "time",
    "withTime",
    "maxPartLength",
  ];
  const keys = Object.keys(q);

  if (keys.length > allowedKeys.length) return false;
  if (keys.some((key) => !allowedKeys.includes(key))) return false;
  if (keys.includes("from") !== keys.includes("to")) return false;
  if (keys.includes("maxPartLength") && q.maxPartLength !== null) {
    const parsedInt = parseInt(q.maxPartLength);
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
  const history = useHistory();
  const location = useLocation();
  const [searchOptions, setSearchOptions] = useState({});
  const [valueName, setName] = useState("");
  const [valuePlace, setPlace] = useState([null, null]);
  const [valueDate, setDate] = useState([null, null, null]);
  const [valueTime, setTime] = useState(["0", "00"]);
  const [valueMaxPart, setMaxPart] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState("검색 조건을 선택해주세요");

  const clearState = () => {
    onCall.current = false;
    setSearchOptions({});
    setName("");
    setPlace([null, null]);
    setDate([null, null, null]);
    setTime(["0", "00"]);
    setMaxPart(null);
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
      if (key === "maxPartLength" && val !== null)
        newSearchOptions.maxPartLength = true;
    }
    setSearchOptions(newSearchOptions);
    if (newSearchOptions.name) setName(q.name);
    if (newSearchOptions.place) setPlace([q.from, q.to]);
    if (newSearchOptions.date) {
      const queryTime = moment(q.time);
      setDate([queryTime.year(), queryTime.month() + 1, queryTime.date()]);
      if (newSearchOptions.time)
        setTime([
          queryTime.hour().toString(),
          (Math.floor(queryTime.minute() / 10) * 10).toString(),
        ]);
    }
    if (newSearchOptions.maxPartLength) setMaxPart(Number(q.maxPartLength));
  };

  useEffect(() => {
    const q = qs.parse(location.search.slice(1), searchQueryOption);

    if (Object.keys(q).length === 0) {
      clearState();
      return;
    }

    if (isSearchAll(q)) {
      axios
        .get("rooms/v2/search")
        .then((res) => {
          setSearchResult(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (isValidQuery(q)) {
      setStatesFromQuery(q);
      axios
        .get("rooms/v2/search", {
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
  }, [location.search]);

  useEffect(() => {
    if (!Object.values(searchOptions).some((option) => option)) {
      setMessage("빠른 출발 검색");
      setDisabled(false);
    } else if (searchOptions.name && valueName == "") {
      setMessage("방 이름을 입력해주세요");
      setDisabled(true);
    } else if (
      (searchOptions.place && valuePlace.some((place) => place == null)) ||
      (searchOptions.date && valueDate.some((date) => date == null)) ||
      (searchOptions.time && valueTime.some((time) => time == null))
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
      !valueDate.some((date) => date == null) &
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
      setPlace([null, null]);
  }, [searchOptions.place]);
  useEffect(() => {
    if (!searchOptions.date && valueDate[0] !== null)
      setDate([null, null, null]);
  }, [searchOptions.date]);
  useEffect(() => {
    if (searchOptions.time) {
      if (valueTime[0] === "0" && valueTime[1] === "00") {
        const today = getToday10();
        setTime([today.hour().toString(), today.minute().toString()]);
      }
    } else if (valueTime[0] !== "0" || valueTime[1] !== "00") {
      setTime(["0", "00"]);
    }
  }, [searchOptions.time]);
  useEffect(() => {
    if (searchOptions.maxPartLength) {
      if (valueMaxPart === null) setMaxPart(4);
    } else if (valueMaxPart !== null) setMaxPart(null);
  }, [searchOptions.maxPartLength]);

  const onClickSearch = async () => {
    if (!onCall.current) {
      onCall.current = true;
      setSearchResult([]);
    }

    if (!Object.values(searchOptions).some((option) => option)) {
      history.push("/search?all=true");
    } else {
      const date = moment(
        `${valueDate[0]}-${
          valueDate[1] < 10 ? "0" + valueDate[1] : valueDate[1]
        }-${valueDate[2]}`
      );
      let withTime = false;

      if (searchOptions.time) {
        date.hour(valueTime[0]);
        date.minute(valueTime[1]);
        withTime = true;
      } else if (date.isSame(getToday(), "day")) {
        date.hour(getToday().hour());
        date.minute(getToday().minute());
      }
      const q = qs.stringify(
        {
          name: valueName.length ? valueName : null,
          from: valuePlace[0],
          to: valuePlace[1],
          time: date.toISOString(),
          withTime,
          maxPartLength: valueMaxPart,
        },
        searchQueryOption
      );
      history.push(`/search?${q}`);
    }
  };

  const leftLay = (
    <>
      <div
        style={{
          color: "#6E3678",
          fontSize: "14px",
          letterSpacing: "0.03em",
        }}
      >
        어떤 조건으로 검색할까요?
      </div>
      <SelectSearchOptions options={searchOptions} handler={setSearchOptions} />
      {searchOptions.name ? (
        <OptionName value={valueName} handler={setName} />
      ) : null}
      {searchOptions.place ? (
        <OptionPlace value={valuePlace} handler={setPlace} />
      ) : null}
      {searchOptions.date ? (
        <OptionDate value={valueDate} handler={setDate} />
      ) : null}
      {searchOptions.time ? (
        <OptionTime value={valueTime} handler={setTime} page="search" />
      ) : null}
      {searchOptions.maxPartLength ? (
        <OptionMaxPart value={valueMaxPart} handler={setMaxPart} />
      ) : null}
      <Button
        type="purple"
        disabled={disabled}
        padding="13px 0px 14px"
        radius={12}
        font={theme.font16_bold}
        onClick={onClickSearch}
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
    </>
  );
  const rightLay =
    searchResult === null ? null : (
      <SideResult result={searchResult} mobile={reactiveState == 3} />
    );
  return (
    <div>
      <Title icon="search" header={true} marginAuto={true}>
        방 검색하기
      </Title>
      <RLayout.R2
        left={reactiveState == 3 && searchResult !== null ? null : leftLay}
        right={rightLay}
        priority={
          reactiveState == 3 && searchResult !== null ? "right" : "left"
        }
      />
    </div>
  );
};

export default Search;
