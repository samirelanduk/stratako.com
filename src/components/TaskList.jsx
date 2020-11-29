import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { CURRENT_OPERATIONS } from "../queries";
import { COMPLETE_OPERATION, CREATE_TASK, TOGGLE_TASK, DELETE_TASK } from "../mutations";

const TaskList = props => {

  const { tasks, operation } = props;

  const [newTask, setNewTask] = useState("");

  const [createTask,] = useMutation(CREATE_TASK, {
    refetchQueries: [{query: CURRENT_OPERATIONS}],
    onCompleted: () => setNewTask("")
  });

  const [toggleTask,] = useMutation(TOGGLE_TASK, {
    refetchQueries: [{query: CURRENT_OPERATIONS}]
  });

  const [deleteTask,] = useMutation(DELETE_TASK, {
    refetchQueries: [{query: CURRENT_OPERATIONS}]
  });

  const formSubmit = e => {
    e.preventDefault();
    createTask({
      variables: {name: newTask, operation: operation.id}
    })
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div className="task" key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask({variables: {id: task.id}})}
          />
          <div className="name">{task.name}</div>
          <div className="delete" onClick={() => deleteTask({variables: {id: task.id}})} />
        </div>
      ))}

      <form onSubmit={formSubmit}>
        <input
          className="new"
          value={newTask}
          placeholder="New task"
          onChange={e => setNewTask(e.target.value)}
          required
        />
      </form>
    </div>
  );
};

TaskList.propTypes = {
  
};

export default TaskList;