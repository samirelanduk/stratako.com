import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames";

const Base = props => {

  return (
    <div className="base">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/operations/">Operations</Link>
        <Link to="/projects/">Projects</Link>
      </nav>
      <main className={props.className}>
        {props.children}
      </main>
    </div>
  );
};

Base.propTypes = {
  
};

export default Base;