import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import Base from "./Base";
import { CURRENT_OPERATIONS } from "../queries";
import { COMPLETE_OPERATION, CREATE_TASK, TOGGLE_TASK, DELETE_TASK } from "../mutations";

const HomePage = () => {

  const [newTasks, setNewTasks] = useState(null);

  const { loading, data } = useQuery(CURRENT_OPERATIONS, {
    onCompleted: data => {
      if (newTasks === null) {
        setNewTasks(data.slots.map(() => ""));
      }
    }
  });

  const [completeOperation, completeOperationMutation] = useMutation(COMPLETE_OPERATION, {
    refetchQueries: [{query: CURRENT_OPERATIONS}]
  });

  const complete = id => {
    completeOperation({
      variables: {id}
    })
  }

  const [toggleTask, toggleTaskMutation] = useMutation(TOGGLE_TASK, {
    refetchQueries: [{query: CURRENT_OPERATIONS}]
  });

  const toggle = id => {
    toggleTask({variables: {id}})
  }

  const [deleteTask, deleteTaskMutation] = useMutation(DELETE_TASK, {
    refetchQueries: [{query: CURRENT_OPERATIONS}]
  });

  const [createTask, createTaskMutation] = useMutation(CREATE_TASK, {
    refetchQueries: [{query: CURRENT_OPERATIONS}],
    onCompleted: data => {
      newTasks[data.createTask.task.operation.slot.order - 1] = "";
      setNewTasks([...newTasks]);
    }
  });


  const create = (e, name, operationId) => {
    e.preventDefault();
    createTask({
      variables: {name, operation: operationId}
    })
  }

  if (loading) {
    return (
      <Base className="home-page">
        Loading
      </Base>
    );
  }

  return (
    <Base className="home-page">
      <div className="slots">
        {data.slots.map((slot, slotIndex) => (
          <div className="slot" key={slot.id}>
            <h2 className="slot-title">{slot.name}</h2>
            {slot.operation && (
              <div className="operation">
                <h3><Link to={`/operations/${slot.operation.id}/`}>{slot.operation.name}</Link></h3>
                <div className="started">{slot.operation.started}</div>
                <button onClick={() => complete(slot.operation.id)}>Complete</button>
                <div className="projects">
                  {slot.operation.projects.map(project => <Link key={project.id} to={`/projects/${project.id}/`} className="project">{project.name}</Link>)}
                </div>
                <div className="task-list">
                  {slot.operation.tasks.map(task => (
                    <div className="task" key={task.id}>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggle(task.id)}
                      />
                      <div className="name">{task.name}</div>
                      <div className="delete" onClick={() => deleteTask({variables: {id: task.id}})} />
                    </div>
                  ))}
                  {newTasks !== null && <form onSubmit={e => create(e, newTasks[slotIndex], slot.operation.id)}>
                    <input
                      className="new"
                      value={newTasks[slotIndex]}
                      placeholder="New task"
                      onChange={e => {
                        newTasks[slotIndex] = e.target.value;
                        setNewTasks([...newTasks]);
                      }}
                      required
                    />
                  </form>}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Base>
  );
};

HomePage.propTypes = {
  
};

export default HomePage;