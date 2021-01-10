import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { cloneDeep } from "lodash";
import { SLOTS } from "../queries";
import { UPDATE_SLOT } from "../mutations";

const SlotSummary = props => {

  const { slot } = props;

  const ref = useRef(null);
  const textRef = useRef(null);
  
  useEffect(() => {
    /**
     * Make sure clicking away from new summary works
     */

    window.addEventListener("click", clickOutside);
    return () => window.removeEventListener("click", clickOutside);
  })

  const [updateSlot,] = useMutation(UPDATE_SLOT);

  const clickOutside = e => {
    /**
     * Is the user indicating they are done editing the new slot?
     */

    if (!e || (ref.current && !ref.current.contains(e.target))) {
      updateSlot({variables: {id: slot.id, name: textRef.current.innerText}});
    }
  }

  const newNameTyping = e => {
    /**
     * Update the new name text, and save if Enter
     */

    if (e.keyCode === 13) {
      clickOutside();
      e.preventDefault();
      textRef.current.blur();
    }
  }

  return (
    <div className="slot-summary" key={slot.id} ref={ref}>
      <div 
        className="slot-name" contentEditable={true} onKeyDown={newNameTyping}
        suppressContentEditableWarning={true} ref={textRef}
      >{slot.name}</div>
      <div className="slot-info">No current operation, none waiting.</div>
    </div>
  );
};

SlotSummary.propTypes = {
  
};

export default SlotSummary;