import React from "react";
import { useQuery } from "@apollo/client";
import Base from "./Base";
import { FUTURE_OPERATIONS } from "../queries";

const OperationsPage = () => {

  const { loading, data } = useQuery(FUTURE_OPERATIONS);

  if (loading) {
    return (
      <Base className="operations-page">
        Loading
      </Base>
    );
  }

  const operations = data.operations.edges.map(edge => edge.node);
  const slot1 = operations.filter(operation => operation.slot === 1);
  const slot2 = operations.filter(operation => operation.slot === 2);
  const noSlot = operations.filter(operation => operation.slot === null);

  return (
    <Base className="operations-page">
      <div className="slots">
        <div className="slot">
          <h2 className="slot-title">Slot 1</h2>
          {slot1.map(operation => (
            <div className="operation">
              <h3>{operation.name}</h3>
            </div>
          ))}
        </div>
        <div className="slot">
          <h2 className="slot-title">Slot 2</h2>
          {slot2.map(operation => (
            <div className="operation">
              <h3>{operation.name}</h3>
            </div>
          ))}
        </div>
        <div className="slot">
          <h2 className="slot-title">No Slot</h2>
          {noSlot.map(operation => (
            <div className="operation">
              <h3>{operation.name}</h3>
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