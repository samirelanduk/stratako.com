import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";

const Operation = props => {

  const { operation } = props;

  return (
    <Draggable draggableId={operation.id.toString()} index={operation.order || operation.projectOrder}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="operation">
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
      )}
    </Draggable>

  );
};

Operation.propTypes = {
  operation: PropTypes.object.isRequired
};

export default Operation;