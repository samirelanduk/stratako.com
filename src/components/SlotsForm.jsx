import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { SLOTS } from "../queries";

const SlotsForm = () => {

  const { loading, data } = useQuery(SLOTS);

  if (loading) return <div className="slots-form"></div>

  const slots = data.user.slots;

  return (
    <div className="slots-form">
      <div className="slot-count">You have {slots.length} slot{slots.length === 1 ? "" : "s"}:</div>

      <div className="slots-grid">
        {slots.map(slot => (
          <div className="slot-summary" key={slot.id}>
            <div className="slot-name">{slot.name}</div>
            <div className="slot-info">No current operation, none waiting.</div>
          </div>
        ))}
      </div>
    </div>
  );
};

SlotsForm.propTypes = {
  
};

export default SlotsForm;