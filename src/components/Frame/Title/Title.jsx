import React from "react";
import PropTypes from "prop-types";
import RLayout from "../ReactiveLayout/RLayout";

const Title = (props) => {
  const title = (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {props.icon({
          width: "24px",
          height: "24px",
          color: "var(--purple)",
        })}
        <div
          style={{
            marginLeft: "8px",
            lineHeight: "23px",
            fontSize: "20px",
            fontWeight: "bold",
            letterSpacing: "0.03em",
            color: "var(--purple)",
          }}
        >
          {props.children}
        </div>
      </div>
    </>
  );

  if (props.marginAuto) {
    return <RLayout.R1>{title}</RLayout.R1>;
  }
  return title;
};

Title.propTypes = {
  icon: PropTypes.any,
  children: PropTypes.any,
  marginAuto: PropTypes.bool,
};
Title.defaultProps = {
  marginAuto: true,
};

export default Title;
