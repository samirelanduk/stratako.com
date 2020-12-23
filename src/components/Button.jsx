import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ClipLoader } from "react-spinners";

const Button = props => {

  const { loading, onClick } = props;
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const buttonRef = useRef(null);

  useEffect(() => {
    setWidth(buttonRef.current.clientWidth);
    setHeight(buttonRef.current.clientHeight);
  })

  const className = classNames({
    button: true, loading, [props.className]: Boolean(props.className)});

  return (
    <button
      ref={buttonRef} className={className} onClick={onClick}
      style={loading ? {width, height} : null}
    >
      {loading ? <ClipLoader color="white" size="20px" /> : props.children}
    </button>
  );
};

Button.propTypes = {
  
};

export default Button;