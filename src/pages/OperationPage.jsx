import React from "react";
import { useRouteMatch } from "react-router";
import { useQuery, useMutation } from "@apollo/client";
import { DragDropContext } from "react-beautiful-dnd";
import Base from "./Base";
import TaskList from "../components/TaskList";
import { OPERATION } from "../queries";
import { MOVE_TASK } from "../mutations";

const OperationPage = () => {

  const operationId = useRouteMatch("/operations/:id").params.id;

  const { loading, data } = useQuery(OPERATION, {
    variables: { id: operationId}
  });

  const [moveTask,] = useMutation(MOVE_TASK);

  if (loading) return <Base className="operation-page" loading={true} />

  const operation = data.operation;

  const onDragEnd = result => {
    const taskId = data.operation.tasks[result.source.index].id;
    const index = result.destination.index;

    moveTask({
      variables: {id: taskId, index},
      optimisticResponse: {
        __typename: "Mutation",
      },
      update: (proxy) => {
        const newData = JSON.parse(JSON.stringify(proxy.readQuery({ query: OPERATION, variables: { id: operationId}})));        

        for (let task of newData.operation.tasks) {
          if (task.id === taskId) {
            newData.operation.tasks = newData.operation.tasks.filter(task => task.id !== taskId);
            newData.operation.tasks.splice(index, 0, task);
            break;
          }

        }
        proxy.writeQuery({ query: OPERATION, variables: { id: operationId}, data: newData});
      }
    });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Base className="operation-page">
        <h1>{operation.name}</h1>
        <p>{operation.description}</p>

        {operation.started && <div>Started: {operation.started}</div> }
        {operation.completed && <div>Completed: {operation.completed}</div> }

        <TaskList tasks={operation.tasks} operation={operation} />
      </Base>
    </DragDropContext>
  );
};

OperationPage.propTypes = {
  
};

export default OperationPage;