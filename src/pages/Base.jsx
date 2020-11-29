import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Div100vh from "react-div-100vh";
import ClipLoader from "react-spinners/ClipLoader";
import Sidebar from "../components/Sidebar";

const Base = props => {

  const { loading } = props;

  const className = classNames({base: true, loading});

  return (
    <Div100vh className={className}>
      <Sidebar />
      <main className={props.className}>
        {loading ? <ClipLoader /> : props.children}
      </main>
    </Div100vh>
  );
};

Base.propTypes = {
  
};

export default Base;