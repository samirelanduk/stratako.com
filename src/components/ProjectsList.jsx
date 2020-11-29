import React from "react";
import PropTypes from "prop-types";

const ProjectsList = props => {

  const { projects } = props;

  return (
    <div className="projects-list">
      {projects.map(project => (
        <div className="project">
          <div className="project-color" />
          <div className="project-name">{project.name}</div>
        </div>
      ))}
    </div>
  );
};

ProjectsList.propTypes = {
  
};

export default ProjectsList;