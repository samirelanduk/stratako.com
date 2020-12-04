import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { CURRENT_OPERATIONS, OPERATION, PROJECT } from "../queries";
import { CREATE_TASK } from "../mutations";
import Task from "./Task";

const TaskList = props => {

  const { tasks, operation, project } = props;

  const queriesToUpdate = [{query: CURRENT_OPERATIONS}];
  if (operation) queriesToUpdate.push({query: OPERATION, variables: {id: operation.id}})
  if (project) queriesToUpdate.push({query: PROJECT, variables: {id: project.id}})

  const [newTask, setNewTask] = useState("");

  const [createTask,] = useMutation(CREATE_TASK, {
    refetchQueries: queriesToUpdate,
    onCompleted: () => setNewTask("")
  });

  const formSubmit = e => {
    e.preventDefault();
    createTask({
      variables: {name: newTask, operation: operation && operation.id, project: project && project.id}
    })
  }

  return (
    <div className="task-list">
      {tasks.map(task => <Task task={task} operation={operation} project={project} key={task.id} />)}

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