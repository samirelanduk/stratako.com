import React from "react";
import PropTypes from "prop-types";
import Operation from "../components/Operation";
import NewOperation from "./NewOperation";

const Slot = props => {

  const { slot } = props;

  const empty = !slot.operation && (!slot.operations || (
    slot.operations && !slot.operations.length
  ));


  return (
    <div className="slot">
      <div className="slot-name">{slot.name}</div>
      <div className="operations">
        {slot.operation && !slot.operations && <Operation operation={slot.operation} />}
        {slot.operations && slot.operations.map((operation, index) => (
          <Operation
            key={operation.id}
            operation={operation}
            canActivate={Boolean(!slot.operation)}
            canMoveUp={index !== 0}
            canMoveDown={index !== slot.operations.length - 1}
            slot={slot}
            index={index}
          />
        ))}
        {slot.operations && <NewOperation slot={slot} />}
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