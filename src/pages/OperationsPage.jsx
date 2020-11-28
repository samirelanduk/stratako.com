import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Base from "./Base";
import { FUTURE_OPERATIONS } from "../queries";
import { REORDER_OPERATION } from "../mutations";

const OperationsPage = () => {

  const [slots, setSlots] = useState(null);

  const [slot1, setSlot1] = useState(null);
  const [slot2, setSlot2] = useState(null);
  const [slotnull, setSlotnull] = useState(null);

  const { loading, data } = useQuery(FUTURE_OPERATIONS, {
    skip: slots !== null,
    onCompleted: data => {
      const operations = data.operations.edges.map(edge => edge.node);
      setSlots([
        operations.filter(operation => operation.slot === 1),
        operations.filter(operation => operation.slot === 2),
        operations.filter(operation => operation.slot === null),
      ])
    }
  });


  const [reorderOperation, reorderOperationMutation] = useMutation(REORDER_OPERATION, {
    onCompleted: data => {
      const operations = data.reorderOperation.operations.edges.map(edge => edge.node);
      slots[operations[0].slot ? operations[0].slot - 1 : 2] = operations;
      setSlots([...slots]);
    }
  });

  const reorder = (slot, operationId, index) => {
    reorderOperation({
      variables: {slot, index, operation: operationId}
    });
  }

  if (!slots) {
    return (
      <Base className="operations-page">
        Loading
      </Base>
    );
  }


  return (
    <Base className="operations-page">
      <div className="slots">
        <div className="slot">
          <h2 className="slot-title">Slot 1</h2>
          {slots[0].map((operation, index) => (
            <div className="operation">
              <h3>{operation.name}</h3>
              <div className="order-buttons">
                <div
                  className={`order-button ${index === 0 ? "hidden" : ""}`}
                  onClick={() => reorder(1, operation.id, index - 1)}
                >⬆️</div>
                <div
                  className={`order-button ${index === slots[0].length - 1 ? "hidden" : ""}`}
                  onClick={() => reorder(1, operation.id, index + 1)}
                >⬇️</div>
              </div>
            </div>
          ))}
        </div>
        <div className="slot">
          <h2 className="slot-title">Slot 2</h2>
          {slots[1].map((operation, index) => (
            <div className="operation">
            <h3>{operation.name}</h3>
            <div className="order-buttons">
              <div
                className={`order-button ${index === 0 ? "hidden" : ""}`}
                onClick={() => reorder(2, operation.id, index - 1)}
              >⬆️</div>
              <div
                className={`order-button ${index === slots[1].length - 1 ? "hidden" : ""}`}
                onClick={() => reorder(2, operation.id, index + 1)}
              >⬇️</div>
            </div>
          </div>
          ))}
        </div>
        <div className="slot">
          <h2 className="slot-title">No Slot</h2>
          {slots[2].map((operation, index) => (
            <div className="operation">
            <h3>{operation.name}</h3>
            <div className="order-buttons">
              <div
                className={`order-button ${index === 0 ? "hidden" : ""}`}
                onClick={() => reorder(null, operation.id, index - 1)}
              >⬆️</div>
              <div
                className={`order-button ${index === slots[2].length - 1 ? "hidden" : ""}`}
                onClick={() => reorder(null, operation.id, index + 1)}
              >⬇️</div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </Base>
  );
};

OperationsPage.propTypes = {
  
};

export default OperationsPage;