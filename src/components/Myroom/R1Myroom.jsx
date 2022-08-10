import React, { useEffect, useState } from "react";
import Title from "components/common/Title";
import PropTypes from "prop-types";

const R1Myroom = (props) => {
  return (
    <div>
      <Title icon="current" header={true}>
        참여 중인 방
      </Title>
      <Title icon="past" header={true}>
        과거 참여 방
      </Title>
    </div>
  );
};

export default R1Myroom;
