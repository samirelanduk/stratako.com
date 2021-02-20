import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Operation = props => {

  const { operation } = props;

  return (
    <div className="operation" key={operation.id}>
      <div className="operation-name">{operation.name}</div>
      <div className="operation-projects">
        {operation.projects.map(project => (
          <Link className="operation-project" key={project.id} to={`/projects/${project.id}/`}>
            <div className="project-color" style={{backgroundColor: project.color }}/>
            <div className="project-name">{project.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

Operation.propTypes = {
  operation: PropTypes.object.isRequired
};

export default Operation;