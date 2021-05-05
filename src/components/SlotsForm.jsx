import React, { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { MoonLoader } from "react-spinners";
import { cloneDeep } from "lodash";
import { SLOTS } from "../queries";
import { CREATE_SLOT, MOVE_SLOT } from "../mutations";
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

  const [createSlot, createSlotMutation] = useMutation(CREATE_SLOT, {
    refetchQueries: [{query: SLOTS}],
    onCompleted: () => {
      setNewName("")
    },
    onError: () => {}
  });

  const [moveSlot,] = useMutation(MOVE_SLOT, {
    optimisticResponse: {__typename: "Mutation"},
  });

  const newNameTyping = e => {
    /**
     * Update the new name text, and save if Enter
     */

    if (e.keyCode === 13) {
      clickOutside();
    } else if (newText.current.innerText.length >= 40 && e.key.length === 1 && !(e.ctrlKey ||  e.altKey || e.metaKey || e.shiftKey)) {
      e.preventDefault();
    } else {
      setNewName(newText.current.innerText + (e.key.length === 1 ? e.key : ""));
    }
  }

  const newButtonClicked = e => {
    /**
     * The user wants to create a new slot.
     */

    e.stopPropagation();
    setNewName("");
    setCreating(true);
  }

  const clickOutside = e => {
    /**
     * Is the user indicating they are done editing the new slot?
     */

    if (!e || (
      newRef.current && !newRef.current.contains(e.target)
    )) {
      if (newText.current && newName && newName.length) {
        createSlot({variables: {name: newName}});
      }
      setCreating(false);
    }
  }

  if (loading) return (
    <div className="slots-form loading"><MoonLoader color="#01a3a4" /></div>
  )

  const slots = data.user.slots;

  const onDragEnd = e => {
    moveSlot({
      variables: {id: e.draggableId, index: e.destination.index - 1},
      update: (proxy) => {
        const newData = cloneDeep(proxy.readQuery({ query: SLOTS }));
        const matchingSlots = newData.user.slots.filter(s => s.id === e.draggableId);
        if (matchingSlots.length) {
          const slot = matchingSlots[0];
          newData.user.slots = newData.user.slots.filter(s => s.id !== e.draggableId);
          newData.user.slots.splice(e.destination.index - 1, 0, slot);
          newData.user.slots = newData.user.slots.map((s, i) => ({...s, order: i + 1}));
        }
        proxy.writeQuery({ query: SLOTS, data: newData })
      },
    })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="slots-form">
        <div className="slot-count">You have {slots.length} slot{slots.length === 1 ? "" : "s"}:</div>
        <Droppable droppableId={"1"}>
          {provided => (
            <div className="slots-grid" ref={provided.innerRef} {...provided.droppableProps}>
              {slots.map(slot => (
                <SlotSummary slot={slot} key={slot.id} canDelete={slots.length !== 1 && slot.id !== 0}/>
              ))}
              {provided.placeholder}
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
                <button
                  className={createSlotMutation.loading ? "new-slot disabled" : "new-slot"}
                  onClick={newButtonClicked}
                >+</button>
              )}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

SlotsForm.propTypes = {
  
};

export default SlotsForm;