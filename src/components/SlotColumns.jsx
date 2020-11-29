import React from "react";
import PropTypes from "prop-types";
import Slot from "../components/Slot";

const SlotColumns = props => {

  const { slots} = props;

  return (
    <div className="slot-columns">
      {slots.map(slot => (
        <Slot slot={slot} key={slot.id} />
      ))}
    </div>
  );
};

SlotColumns.propTypes = {
  
};

export default SlotColumns;