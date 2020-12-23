import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Sidebar = props => {
  return (
    <div className="sidebar">
      <Link to="/" className="logo">stratako</Link>
    </div>
  );
};

Sidebar.propTypes = {
  
};

export default Sidebar;