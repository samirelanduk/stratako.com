import React, { useEffect } from "react";
import { FUTURE_OPERATIONS } from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import { DragDropContext } from "react-beautiful-dnd";
import { cloneDeep } from "lodash";
import Base from "./Base";
import Slots from "../components/Slots";
import { MOVE_OPERATION } from "../mutations";

const OperationsPage = () => {
  useEffect(() => {
    document.title = "stratako - Operations";
  });

  const { loading, data } = useQuery(FUTURE_OPERATIONS);

  const [moveOperation,] = useMutation(MOVE_OPERATION, {
    optimisticResponse: {__typename: "Mutation"},
  });

  if (loading) return <Base loading={true} />

  const slots = data.user.slots;

  const onDragEnd = e => {
    if (e.destination) {
      moveOperation({
        variables: {
          id: e.draggableId, index: e.destination.index - 1,
          slot: e.destination.droppableId
        },
        update: (proxy) => {
          const newData = cloneDeep(proxy.readQuery({ query: FUTURE_OPERATIONS }));
          let operation = null;
          if (e.source.droppableId === "0") {
            operation = newData.user.operationsWithoutSlots.filter(o => o.id === e.draggableId)[0];
            newData.user.operationsWithoutSlots = newData.user.operationsWithoutSlots.filter(o => o.id !== e.draggableId);
            for (let i = 0; i < newData.user.operationsWithoutSlots.length; i++) {
              newData.user.operationsWithoutSlots[i].order = i + 1;
            }
          } else {
            for (let slot of newData.user.slots) {
              if (slot.id === e.source.droppableId) {
                operation = slot.futureOperations.filter(o => o.id === e.draggableId)[0];
                slot.futureOperations = slot.futureOperations.filter(o => o.id !== e.draggableId);
                for (let i = 0; i < slot.futureOperations.length; i++) {
                  slot.futureOperations[i].order = i + 1;
                }
                break;
              }
            }
          }
          if (e.destination.droppableId === "0") {
            newData.user.operationsWithoutSlots.splice(e.destination.index - 1, 0, operation);
            for (let i = 0; i < newData.user.operationsWithoutSlots.length; i++) {
              newData.user.operationsWithoutSlots[i].order = i + 1;
            }
          } else {
            for (let slot of newData.user.slots.concat([ {id: "0", futureOperations: newData.user.operationsWithoutSlots}   ])) {
              if (slot.id === e.destination.droppableId) {
                slot.futureOperations.splice(e.destination.index - 1, 0, operation);
                for (let i = 0; i < slot.futureOperations.length; i++) {
                  slot.futureOperations[i].order = i + 1;
                }
                break;
              }
            }
          }

          proxy.writeQuery({ query: FUTURE_OPERATIONS, data: newData });
        },
      })
    }
  }

  return (
    <Base className="operations-page">
      <DragDropContext onDragEnd={onDragEnd}>
        <Slots slots={slots} unassigned={data.user.operationsWithoutSlots} />
      </DragDropContext>
    </Base>
  )
};

OperationsPage.propTypes = {
  
};

export default OperationsPage;