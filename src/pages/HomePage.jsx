import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { DragDropContext } from "react-beautiful-dnd";
import { CURRENT_OPERATIONS } from "../queries";
import { MOVE_TASK } from "../mutations";
import Base from "./Base";
import SlotColumns from "../components/SlotColumns";

const HomePage = () => {

  const { loading, data } = useQuery(CURRENT_OPERATIONS);

  const [moveTask,] = useMutation(MOVE_TASK);

  if (loading) return <Base className="home-page" loading={true} />

  const onDragEnd = result => {
    const sourceOperationId = result.source.droppableId;
    const destinationOperationId = result.destination.droppableId;
    const taskId = data.slots.filter(
      slot => slot.operation && slot.operation.id === sourceOperationId
    )[0].operation.tasks[result.source.index].id;
    const index = result.destination.index;
    const variables = {id: taskId, index: index};
    if (sourceOperationId !== destinationOperationId)
      variables.operation = destinationOperationId;
    moveTask({
      variables,
      optimisticResponse: {
        __typename: "Mutation",
      },
      update: (proxy) => {
        const newData = JSON.parse(JSON.stringify(proxy.readQuery({ query: CURRENT_OPERATIONS})));        
        for (let slot of newData.slots) {
          if (slot.operation) {
            for (let task of slot.operation.tasks) {
              if (task.id === taskId) {
                slot.operation.tasks = slot.operation.tasks.filter(task => task.id !== taskId);
                for (let slot2 of newData.slots) {
                  if (slot2.operation && slot2.operation.id === destinationOperationId) {
                    slot2.operation.tasks.splice(index, 0, task);
                    break;
                  }
                }
                break;
              }
            }
          }
        }
        proxy.writeQuery({ query: CURRENT_OPERATIONS, data: newData});
      }
    });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Base className="home-page">
        <SlotColumns slots={data.slots} />
      </Base>
    </DragDropContext>
  );
};

HomePage.propTypes = {
  
};

export default HomePage;