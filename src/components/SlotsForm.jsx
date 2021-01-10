import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useQuery, useMutation } from "@apollo/client";
import { cloneDeep } from "lodash";
import { SLOTS } from "../queries";
import { CREATE_SLOT } from "../mutations";
import SlotSummary from "./SlotSummary";

const SlotsForm = () => {

  const { loading, data } = useQuery(SLOTS);

  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const newRef = useRef(null);
  const newText = useRef(null);

  useEffect(() => {
    /**
     * Make sure clicking away from new slot form works, and focus if it's there
     */

    if (newText.current) newText.current.focus();
    window.addEventListener("click", clickOutside);
    return () => window.removeEventListener("click", clickOutside);
  })

  const [createSlot,] = useMutation(CREATE_SLOT, {
    optimisticResponse: {
      __typename: "Mutation",
    },
    update: (proxy) => {
      const newData = cloneDeep(proxy.readQuery({ query: SLOTS }));
      newData.user.slots.push({
        id: Math.floor(Math.random() * 1000000000000),
        order: slots.length, name: newName
      })
      proxy.writeQuery({ query: SLOTS, data: newData })
    },
    onCompleted: () => setNewName("")
  })

  const newNameTyping = e => {
    /**
     * Update the new name text, and save if Enter
     */

    if (e.keyCode === 13) {
      clickOutside();
    } else {
      setNewName(newText.current.innerText + (e.key.length === 1 ? e.key : ""));
    }
  }

  const newButtonClicked = e => {
    /**
     * The user wants to create a new slot.
     */

    e.stopPropagation();
    setCreating(true);
  }

  const clickOutside = e => {
    /**
     * Is the user indicating they are done editing the new slot?
     */

    if (!e || (
      newRef.current && !newRef.current.contains(e.target)
    )) {
      if (newText.current && newName) {
        createSlot({variables: {name: newName}});
      }
      setCreating(false);
    }
  }

  if (loading) return <div className="slots-form"></div>

  const slots = data.user.slots;

  return (
    <div className="slots-form">
      <div className="slot-count">You have {slots.length} slot{slots.length === 1 ? "" : "s"}:</div>
      <div className="slots-grid">
        {slots.map(slot => (
          <SlotSummary slot={slot} key={slot.id} />
        ))}
        {creating ? (
          <div ref={newRef} className="slot-summary new-slot">
            <div
              className="slot-name" contentEditable={true}
              suppressContentEditableWarning={true} ref={newText}
              onKeyDown={newNameTyping}
            />
            <div className="slot-info">No current operation, none waiting.</div>
          </div>
        ) : (
          <button className="new-slot" onClick={newButtonClicked}>+</button>
        )}
      </div>
    </div>
  );
};

SlotsForm.propTypes = {
  
};

export default SlotsForm;