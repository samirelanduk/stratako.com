import React from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { CURRENT_OPERATIONS, OPERATION } from "../queries";
import { TOGGLE_TASK, DELETE_TASK } from "../mutations";

const Task = props => {

  const { task, operation } = props;

  const [toggleTask,] = useMutation(TOGGLE_TASK, {
    refetchQueries: [{query: CURRENT_OPERATIONS}]
  });

  const [deleteTask,] = useMutation(DELETE_TASK, {
    refetchQueries: [
      {query: CURRENT_OPERATIONS}, {query: OPERATION, variables: {id: operation.id}}
    ]
  });

  return (
    <div className="task" key={task.id}>
      <input
        type="checkbox"
        checked={Boolean(task.completed)}
        onChange={() => toggleTask({variables: {id: task.id}})}
      />
      <div className="name">{task.name}</div>
      <div className="delete" onClick={() => deleteTask({variables: {id: task.id}})} />
    </div>
  );
};

Task.propTypes = {
  
};

export default Task;