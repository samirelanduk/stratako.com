import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Div100vh from "react-div-100vh";
import Sidebar from "../components/Sidebar";

const Base = props => {

  return (
    <Div100vh className="base">
      <Sidebar />
      <main className={props.className}>
        {props.children}
      </main>
    </Div100vh>
  );
};

Base.propTypes = {
  
};

export default Base;