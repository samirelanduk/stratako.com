import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProjectsList = props => {

  const { projects } = props;

  return (
    <div className="projects-list">
      {projects.map(project => (
        <Link className="project" to={`/projects/${project.id}/`} key={project.id}>
          <div className="project-color" />
          <div className="project-name">{project.name}</div>
        </Link>
      ))}
    </div>
  );
};

ProjectsList.propTypes = {
  
};

export default ProjectsList;