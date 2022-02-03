/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import PropTypes from "prop-types";

const baseStyle = css`
  min-height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  border-radius: 15px;
  letter-spacing: 0.05em;
  color: white;
  background-color: #6e3678;
`;

const ModalSubmitButton = (
  { backgroundHover, style, onClick, children } = { backgroundHover: "white" }
) => {
  const integratedStyle = css`
    ${baseStyle}
    ${style}

    &:hover {
      background-color: ${backgroundHover};
    }
  `;

  return (
    <div className="BTNC" onClick={onClick} css={integratedStyle}>
      {children}
    </div>
  );
};

ModalSubmitButton.propTypes = {
  // FIXME specify type
  backgroundHover: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
  style: PropTypes.any,
};

export default ModalSubmitButton;
