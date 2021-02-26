import React from "react";
import PropTypes from "prop-types";
import OperationsList from "./OperationsList";
import Operation from "./Operation";

const Slots = props => {
  
  const { slots, unassigned } = props;

  return (
    <div className="slots">
      {slots.map(slot => (
        <div className="slot" key={slot.id}>
          <h2>{slot.name}</h2>

          {slot.currentOperation ? (
            <Operation operation={slot.currentOperation} draggable={false} />
          ) : slot.futureOperations && slot.futureOperations.length ? (
            <OperationsList operations={slot.futureOperations} droppableId={slot.id} />
          ) : (
            <div className="no-data">Currently no operations.</div>
          )}
        </div>
      ))}
      {unassigned && (
        <div className="slot unassigned">
          <h2>Unassigned</h2>
          {unassigned.length ? (
            <OperationsList operations={unassigned} droppableId={"0"} />
          ): <div className="no-data">Currently no operations.</div>}
        </div>
      )}
    </div>
);
};

Slots.propTypes = {
  slots: PropTypes.array.isRequired,
  unassigned: PropTypes.array
};

export default Slots;