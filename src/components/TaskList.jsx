import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { CURRENT_OPERATIONS, OPERATION, PROJECT } from "../queries";
import { CREATE_TASK, MOVE_TASK } from "../mutations";
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

  const [moveTask,] = useMutation(MOVE_TASK, {
    refetchQueries: queriesToUpdate,
  });

  const formSubmit = e => {
    e.preventDefault();
    createTask({
      variables: {name: newTask, operation: operation && operation.id, project: project && project.id}
    })
  }

  const onDragEnd = result => {
    moveTask({variables: {
      id: tasks[result.source.index].id, index: result.destination.index
    }})
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={"1"}>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="task-list" >
            {tasks.map((task, index) => <Task index={index} task={task} operation={operation} project={project} key={task.id} />)}
            {provided.placeholder}
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
        )}
      </Droppable>
    </DragDropContext>
    

    
  );
};

TaskList.propTypes = {
  
};

export default TaskList;