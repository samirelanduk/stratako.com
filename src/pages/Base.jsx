import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Base = props => {
  return (
    <div className="base">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/operations/">Operations</Link>
      </nav>
      <main>
        {props.children}
      </main>
    </div>
  );
};

Base.propTypes = {
  
};

export default Base;