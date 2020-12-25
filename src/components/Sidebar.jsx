import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/" className="logo">stratako</Link>
    </div>
  );
};

Sidebar.propTypes = {
  
};

export default Sidebar;