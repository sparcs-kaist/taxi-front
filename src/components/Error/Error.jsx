import React from "react";
import Title from "../common/Title";
import { useParams } from "react-router-dom";

const Error = () => {
  const { error } = useParams();
  const errorState = error ? error : "404 Not Found!";
  return (
    <div>
      <Title icon="error" header={true}>
        오류가 발생하였습니다
      </Title>
      <div>{errorState}</div>
    </div>
  );
};

export default Error;
