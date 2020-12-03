import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { CURRENT_OPERATIONS, OPERATION } from "../queries";
import { UPDATE_TASK, TOGGLE_TASK, DELETE_TASK } from "../mutations";

const Task = props => {

  const { task, operation } = props;

  const [updateTask,] = useMutation(UPDATE_TASK);

  const [toggleTask,] = useMutation(TOGGLE_TASK, {
    refetchQueries: [{query: CURRENT_OPERATIONS}]
  });

  const [deleteTask,] = useMutation(DELETE_TASK, {
    refetchQueries: [
      {query: CURRENT_OPERATIONS}, {query: OPERATION, variables: {id: operation.id}}
    ]
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
    <div className="task" key={task.id}>
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
      <div className="delete" onClick={() => deleteTask({variables: {id: task.id}})} />
    </div>
  );
};

Task.propTypes = {
  
};

export default Task;