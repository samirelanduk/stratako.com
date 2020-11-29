import React from "react";
import PropTypes from "prop-types";
import Operation from "../components/Operation";

const Slot = props => {

  const { slot } = props;

  const empty = !slot.operation && (!slot.operations || (
    slot.operations && !slot.operations.length
  ));


  return (
    <div className="slot">
      <div className="slot-name">{slot.name}</div>
      <div className="operations">
        {slot.operation && <Operation operation={slot.operation} />}
        {slot.operations && slot.operations.map(operation => (
          <Operation key={operation.id} operation={operation} />
        ))}
        {empty && (
          <div className="no-operations">Currently no operations.</div>
        )}
      </div>
    </div>
  );
};

Slot.propTypes = {
  
};

export default Slot;