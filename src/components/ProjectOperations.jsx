import React from "react";
import PropTypes from "prop-types";
import Operation from "../components/Operation";

const ProjectOperations = props => {

  const { project } = props;

  return (
    <div className="project-operations">
      {project.operations.map((operation, index) => (
        <Operation
          key={operation.id}
          operation={operation}
        />
      ))}
      
    </div>
  );
};

ProjectOperations.propTypes = {
  
};

export default ProjectOperations;