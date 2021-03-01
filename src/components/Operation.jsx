import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import expandIcon from "../images/expand.svg";
import minimizeIcon from "../images/minimize.svg";
import pencilIcon from "../images/pencil.svg";
import { Draggable } from "react-beautiful-dnd";
import { DELETE_OPERATION, START_OPERATION, COMPLETE_OPERATION } from "../mutations";
import { FUTURE_OPERATIONS, PROJECT, SLOTS } from "../queries";

const Operation = props => {

  const { operation, expanded, expand, close, provided } = props;
  const [editing, setEditing] = useState(false);

  const className = classNames({"operation-background": true, expanded});

  const [startOperation, startOperationMutation] = useMutation(START_OPERATION, {
    refetchQueries: [{query: FUTURE_OPERATIONS}, {query: SLOTS }].concat(operation.projects.map(
      project => ({query: PROJECT, variables: {id: project.id}})
    )),
  });

  const [completeOperation, completeOperationMutation] = useMutation(COMPLETE_OPERATION, {
    refetchQueries: [{query: FUTURE_OPERATIONS}, {query: SLOTS }].concat(operation.projects.map(
      project => ({query: PROJECT, variables: {id: project.id}})
    )),
  });

  const [deleteOperation, deleteOperationMutation] = useMutation(DELETE_OPERATION, {
    onCompleted: () => close(),
    refetchQueries: [{query: FUTURE_OPERATIONS}].concat(operation.projects.map(
      project => ({query: PROJECT, variables: {id: project.id}})
    )),
    awaitRefetchQueries: true
  })

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
            {expanded && !editing && (
              <img src={pencilIcon} alt="edit" className="edit" onClick={() => setEditing(true)} />
            )}
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

        {!editing && !expanded && !operation.started && !operation.completed && (
          <button onClick={() => startOperation({variables: {id: operation.id}})}>Start</button>  
        )}
        {!editing && !expanded && operation.started && !operation.completed && (
          <button onClick={() => completeOperation({variables: {id: operation.id}})}>Complete</button>  
        )}

        {editing && (
          <div className="buttons">
            <button className="save">Save</button>
            <button className="delete-button" onClick={() => deleteOperation({variables: {id: operation.id}})}>Delete</button>
          </div>
        )}
        
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