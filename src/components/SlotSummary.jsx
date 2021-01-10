import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { cloneDeep } from "lodash";
import { SLOTS } from "../queries";
import { UPDATE_SLOT, DELETE_SLOT } from "../mutations";
import cross from "../images/cross.svg";

const SlotSummary = props => {

  const { slot, canDelete } = props;

  const ref = useRef(null);
  const textRef = useRef(null);
  const [newText, setNewText] = useState(null);
  
  useEffect(() => {
    /**
     * Make sure clicking away from new summary works
     */

    window.addEventListener("click", clickOutside);
    return () => window.removeEventListener("click", clickOutside);
  })

  const [updateSlot,] = useMutation(UPDATE_SLOT);

  const [deleteSlot,] = useMutation(DELETE_SLOT, {
    optimisticResponse: {
      __typename: "Mutation",
    },
    update: (proxy) => {
      const newData = cloneDeep(proxy.readQuery({ query: SLOTS }));
      newData.user.slots = newData.user.slots.filter(slot_ => slot.id !== slot_.id)
      proxy.writeQuery({ query: SLOTS, data: newData })
    }
  });

  const clickOutside = e => {
    /**
     * Is the user indicating they are done editing the slot?
     */

    if (!e || (ref.current && !ref.current.contains(e.target))) {
      if (textRef.current.innerText !== slot.name) {
        updateSlot({variables: {id: slot.id, name: textRef.current.innerText}});
      } else {
        textRef.current.innerText = slot.name;
      }
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
      <div
        className={canDelete ? "delete" : "delete disabled" }
        onClick={() => deleteSlot({variables: {id: slot.id}})}
      ><img src={cross} alt="delete"/></div>
      <div className="slot-info">No current operation, none waiting.</div>
    </div>
  );
};

SlotSummary.propTypes = {
  
};

export default SlotSummary;