import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import Base from "./Base";
import { CURRENT_OPERATIONS } from "../queries";
import { COMPLETE_OPERATION, CREATE_TASK, TOGGLE_TASK, DELETE_TASK } from "../mutations";

import Slot from "../components/Slot";

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
        {data.slots.map(slot => (
          <Slot slot={slot} key={slot.id} />
        ))}
      </div>
    </Base>
  );
};

HomePage.propTypes = {
  
};

export default HomePage;