import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { DragDropContext } from "react-beautiful-dnd";
import { CURRENT_OPERATIONS } from "../queries";
import { MOVE_TASK } from "../mutations";
import Base from "./Base";
import SlotColumns from "../components/SlotColumns";

const HomePage = () => {

  const { loading, data } = useQuery(CURRENT_OPERATIONS);

  const [moveTask,] = useMutation(MOVE_TASK, {
    refetchQueries: [{query: CURRENT_OPERATIONS}],
  });

  if (loading) return <Base className="home-page" loading={true} />

  const onDragEnd = result => {
    const sourceOperationId = result.source.droppableId;
    const destinationOperationId = result.destination.droppableId;
    const taskId = data.slots.filter(
      slot => slot.operation && slot.operation.id === sourceOperationId
    )[0].operation.tasks[result.source.index].id;
    const index = result.destination.index;
    moveTask({
      variables: {id: taskId, index: index, operation: destinationOperationId},
    })
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