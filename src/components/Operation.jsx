import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";
import expandIcon from "../images/expand.svg"
import minimizeIcon from "../images/minimize.svg"
import { Draggable } from "react-beautiful-dnd";

const Operation = props => {

  const { operation, expanded, expand, close, provided } = props;

  const className = classNames({"operation-background": true, expanded});

  return (
    <div
      className={className} ref={provided && provided.innerRef}
      {...provided ? provided.draggableProps : {}} 
      {...provided ? provided.dragHandleProps : {}}
    >
      <div className="operation" >
        <div className="top-row">
          <div className="operation-name">{operation.name}</div>
          <div className="top-right">
            {expand && (expanded ? (
                <img src={minimizeIcon} alt="minimize" className="close" onClick={close} />
              ) : (
                <img src={expandIcon} alt="expand" className="expand" onClick={expand} />
              ))}
            <div className="operation-projects">
              {operation.projects.map(project => (
                <Link className="operation-project" key={project.id} to={`/projects/${project.id}/`}>
                  <div className="project-color" style={{backgroundColor: project.color }}/>
                  <div className="project-name">{project.name}</div>
                </Link>
              ))}
            </div>

          </div>
        </div>
        {expanded && <div className="description">{operation.description}</div>  }
        
      </div>
    </div>
  )
}

const DraggableOperation = props => {

  const { operation, expanded, expand, close, draggable } = props;

  if (draggable && !expanded) {
    return (
      <Draggable draggableId={operation.id.toString()} index={operation.order === undefined ? operation.projectOrder : operation.order}>
        {provided => (
          <Operation
            operation={operation} expanded={expanded} close={close}
            expand={expand} draggable={draggable} provided={provided}
          />
        )}
      </Draggable>
    )
  } else {
    return (
      <Operation
        operation={operation} expanded={expanded} close={close} expand={expand}
      />
    )
  }
}
  
Operation.propTypes = {
  operation: PropTypes.object.isRequired
};

export default DraggableOperation;