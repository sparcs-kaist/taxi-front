import React from "react";
import Title from "../../Frame/Title/Title";
import Proptypes from "prop-types";

import svgResult from "./svg_result.svg";

const SearchResult = (props) => {
  return (
    <div>
      <div style={{ height: "30px" }} />
      <Title img={svgResult}>검색 결과</Title>
    </div>
  );
};

SearchResult.propTypes = {
  optionstr: Proptypes.string,
};

export default SearchResult;
