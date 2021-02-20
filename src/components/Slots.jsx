import React from "react";
import PropTypes from "prop-types";
import OperationsList from "./OperationsList";

const Slots = props => {
  
  const { slots } = props;

  return (
    <div className="slots">
      {slots.map(slot => (
        <div className="slot" key={slot.id}>
          <h2>{slot.name}</h2>
          {slot.futureOperations && slot.futureOperations.length ? (
            <OperationsList operations={slot.futureOperations} />
          ) : (
            <div className="no-data">
              Currently no operations.
            </div>
          )}
        </div>
      ))}
    </div>
);
};

Slots.propTypes = {
  slots: PropTypes.array.isRequired
};

export default Slots;