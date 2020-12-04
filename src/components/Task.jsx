import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { Draggable } from "react-beautiful-dnd";
import { CURRENT_OPERATIONS, OPERATION, PROJECT } from "../queries";
import { UPDATE_TASK, TOGGLE_TASK, DELETE_TASK } from "../mutations";

const Task = props => {

  const { task, operation, project, index } = props;

  const queriesToUpdate = [{query: CURRENT_OPERATIONS}];
  if (operation) queriesToUpdate.push({query: OPERATION, variables: {id: operation.id}})
  if (project) queriesToUpdate.push({query: PROJECT, variables: {id: project.id}})

  const [updateTask,] = useMutation(UPDATE_TASK);

  const [toggleTask,] = useMutation(TOGGLE_TASK, {
    refetchQueries: [{query: CURRENT_OPERATIONS}]
  });

  const [deleteTask,] = useMutation(DELETE_TASK, {
    refetchQueries: queriesToUpdate
  });

  const ref = useRef();

  const taskKeyDown = e => {
    if (e.keyCode === 13) {
      ref.current.blur();
    }
  }

  const taskLostFocus = () => {
    updateTask({
      variables: {id: task.id, name: ref.current.innerHTML}
    })
  }

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {provided => (
        <div className="task" key={task.id} ref={provided.innerRef} {...provided.draggableProps} >
          <input
            type="checkbox"
            checked={Boolean(task.completed)}
            onChange={() => toggleTask({variables: {id: task.id}})}
          />
          <div
            ref={ref}
            className="name"
            onKeyDown={taskKeyDown}
            onBlur={taskLostFocus}
            spellCheck={false}
            contentEditable={true}
            suppressContentEditableWarning={true}
          >{task.name}</div>
          <div className="dragger" {...provided.dragHandleProps}>
            <div className="drag-line" />
            <div className="drag-line" />
            <div className="drag-line" />
          </div>
          <div className="delete" onClick={() => deleteTask({variables: {id: task.id}})} />
        </div>
      )}
    </Draggable>
    );
};

Task.propTypes = {
  
};

export default Task;