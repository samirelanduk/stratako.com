import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Project = props => {

  const { project } = props;

  return (
    <Link className="project" style={{borderRightColor: project.color}} to={`/projects/${project.id}/`}>
      <div className="name">{project.name}</div>
    </Link>
  );
};

Project.propTypes = {
  project: PropTypes.object.isRequired
};

export default Project;