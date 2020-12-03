import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { CURRENT_OPERATIONS, OPERATION } from "../queries";
import { CREATE_TASK } from "../mutations";
import Task from "./Task";

const TaskList = props => {

  const { tasks, operation } = props;

  const [newTask, setNewTask] = useState("");

  const [createTask,] = useMutation(CREATE_TASK, {
    refetchQueries: [
      {query: CURRENT_OPERATIONS}, {query: OPERATION, variables: {id: operation.id}}
    ],
    onCompleted: () => setNewTask("")
  });

  const formSubmit = e => {
    e.preventDefault();
    createTask({
      variables: {name: newTask, operation: operation.id}
    })
  }

  return (
    <div className="task-list">
      {tasks.map(task => <Task task={task} operation={operation} key={task.id} />)}

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