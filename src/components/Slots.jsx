import React from "react";
import PropTypes from "prop-types";
import OperationsList from "./OperationsList";
import Operation from "./Operation";
import NewOperation from "./NewOperation";

const Slots = props => {
  
  const { slots, unassigned } = props;

  return (
    <div className="slots">
      {slots.map(slot => (
        <div className="slot" key={slot.id}>
          <h2>{slot.name}</h2>

          {slot.currentOperation ? (
            <Operation operation={slot.currentOperation} draggable={false} />
          ) : slot.futureOperations && slot.futureOperations.length && slot.futureOperations[0].name ? (
            <>
              <OperationsList operations={slot.futureOperations} droppableId={slot.id} canStart={slot.vacant} />
              <NewOperation slot={slot} />
            </>
          ) : (
            <div className="no-data">Currently no operations.</div>
          )}
        </div>
      ))}
      {unassigned && (
        <div className="slot unassigned">
          <h2>Unassigned</h2>
          {unassigned.length ? (
            <>
              <OperationsList operations={unassigned} droppableId={"0"} />
              <NewOperation slot={null} />
            </>
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