import React from "react";
import Title from "../../Frame/Title/Title";
import Proptypes from "prop-types"
import svgSearch from "./svg_search.svg";

// result type
// checkname: { type: String, required: true, default: "이름 없음" },
// from: { type: schema.Types.ObjectId, required: true },
// to: { type: schema.Types.ObjectId, required: true },
// time: { type: Date, required: true }, // 출발 시간
// part: { type: Array, default: [] }, // 참여 멤버
// madeat: { type: Date, required: true }, // 생성 날짜

const SearchResult = (props) => {
  const renderResult = (result) => {
    return (
      <div style={{ color: "#000000" }}>
        from: ${result.from}, to: ${result.to}, name: ${result.name}, time: ${result.time}
      </ div>
    )
  }
  console.log(props.searchResults)

  return (
    <div>
      <div style={{ height: "20px" }} />
      <Title img={svgSearch}>검색 결과</Title>
      {Array.isArray(props.searchResults) ?
        props.searchResults.map(renderResult) :
        renderResult(props.searchResults)}
    </div>
  );
}

SearchResult.propTypes = {
  searchResults: Proptypes.array.isRequired
}

export default SearchResult;