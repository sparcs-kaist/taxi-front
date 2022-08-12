import React, { useState, useRef, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import { useR2state } from "hooks/useReactiveState";
import RLayout from "components/common/RLayout";
import Title from "components/common/Title";
import SubmitButton from "components/common/roomOptions/SubmitButton";
import SideResult from "./SideResult";
import axios from "tools/axios";
import moment from "moment";
import { getToday10 } from "tools/trans";
import PropTypes from "prop-types";

import OptionName from "components/common/roomOptions/Name";
import OptionPlace from "components/common/roomOptions/Place";
import OptionDate from "components/common/roomOptions/Date";
import OptionTime from "components/common/roomOptions/Time";
import OptionMaxPartLength from "components/common/roomOptions/MaxPartLength";

const SearchOption = (props) => {
  const [isHover, setHover] = useState(false);
  const style = useSpring({
    height: "15px",
    borderRadius: "15px",
    padding: "8px 15px 7px 15px",
    boxShadow:
      "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.05), 0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.03), 0px 2px 3px -1px rgba(110, 54, 120, 0.11)",
    background: props.selected
      ? isHover
        ? "#572A5E"
        : "#6E3678"
      : isHover
      ? "#F4EAF6"
      : "#FFFFFF",
    fontSize: "13px",
    color: props.selected ? "#FFFFFF" : "#323232",
    config: { duration: 100 },
  });
  return (
    <animated.div
      style={style}
      className="BTNC ND"
      onClick={() => props.onClick(props.id)}
      onMouseEnter={() => setHover(true)}
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

const Search = () => {
  const reactiveState = useR2state();
  const onCall = useRef(false);
  const [searchOptions, setSearchOptions] = useState({});
  const [valueName, setName] = useState("");
  const [valuePlace, setPlace] = useState([null, null]);
  const [valueDate, setDate] = useState([null, null, null]);
  const [valueTime, setTime] = useState(["0", "00"]);
  const [valueMaxPartLength, setMaxPartLength] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [disable, setDisable] = useState(true);
  const [message, setMessage] = useState("검색 조건을 선택해주세요");

  useEffect(() => {
    if (!Object.values(searchOptions).some((option) => option == true)) {
      setMessage("모든 방 검색하기");
      setDisable(false);
    } else if (searchOptions.name && valueName == "") {
      setMessage("방 이름을 입력해주세요");
      setDisable(true);
    } else if (
      (searchOptions.place && valuePlace.some((place) => place == null)) ||
      (searchOptions.date && valueDate.some((date) => date == null)) ||
      (searchOptions.time && valueTime.some((time) => time == null))
    ) {
      setMessage("선택을 완료해주세요");
      setDisable(true);
    } else if (
      (valuePlace[0] !== null || valuePlace[0] !== null) &&
      valuePlace[0]?._id === valuePlace[1]?._id
    ) {
      setMessage("출발지와 도착지는 달라야 합니다");
      setDisable(true);
    } else if (
      searchOptions.time &
      !valueDate.some((date) => date == null) &
      moment(
        `${valueDate[0]}-${
          valueDate[1] < 10 ? "0" + valueDate[1] : valueDate[1]
        }-${valueDate[2]} ${valueTime[0]}:${valueTime[1]}`
      ).isBefore(moment(), "minute")
    ) {
      setMessage("과거 시점은 검색할 수 없습니다.");
      setDisable(true);
    } else {
      setMessage("방 검색하기");
      setDisable(false);
    }
  }, [searchOptions, valueName, valuePlace, valueDate, valueTime]);

  useEffect(() => {
    setName("");
  }, [searchOptions.name]);
  useEffect(() => {
    setPlace([null, null]);
  }, [searchOptions.place]);
  useEffect(() => {
    setDate([null, null, null]);
  }, [searchOptions.date]);
  useEffect(() => {
    if (searchOptions.time) {
      const today = getToday10();
      setTime([today.hour().toString(), today.minute().toString()]);
    } else {
      setTime(["0", "00"]);
    }
  }, [searchOptions.time]);
  useEffect(() => {
    if (searchOptions.maxPartLength) setMaxPartLength(4);
    else setMaxPartLength(null);
  }, [searchOptions.maxPartLength]);

  const onClickSearch = async () => {
    if (!onCall.current) {
      onCall.current = true;
      setSearchResult([]);
    }

    if (!Object.values(searchOptions).some((option) => option == true)) {
      await axios
        .get("rooms/search")
        .then((res) => {
          setSearchResult(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    } else {
      const date = moment(
        `${valueDate[0]}-${
          valueDate[1] < 10 ? "0" + valueDate[1] : valueDate[1]
        }-${valueDate[2]}`
      );
      if (searchOptions.time) {
        date.hour(valueTime[0]);
        date.minute(valueTime[1]);
      } else if (date.isSame(moment(), "day")) {
        date.hour(moment().hour());
        date.minute(moment().minute());
      }
      await axios
        .get("rooms/v2/search", {
          params: {
            name: valueName.length ? valueName : null,
            from: valuePlace[0]._id,
            to: valuePlace[1]._id,
            time: date.toISOString(),
            maxPartLength: valueMaxPartLength,
          },
        })
        .then((res) => {
          setSearchResult(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const leftLay = (
    <div>
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
        <OptionMaxPartLength
          value={valueMaxPartLength}
          handler={setMaxPartLength}
        />
      ) : null}
      <SubmitButton
        marginAuto={false}
        background="#6E3678"
        backgroundHover="#572A5E"
        onClick={onClickSearch}
        disable={disable}
      >
        {message}
      </SubmitButton>
    </div>
  );
  const rightLay =
    searchResult === null ? null : (
      <SideResult result={searchResult} mobile={reactiveState == 3} />
    );
  return (
    <div>
      <Title icon="search" header={true}>
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
