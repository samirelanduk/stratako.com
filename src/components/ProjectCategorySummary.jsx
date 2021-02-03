import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { cloneDeep } from "lodash";
import { Draggable } from "react-beautiful-dnd";
import { PROJECT_CATEGORIES } from "../queries";
import { UPDATE_PROJECT_CATEGORY, DELETE_PROJECT_CATEGORY } from "../mutations";
import cross from "../images/cross.svg";

const ProjectCategorySummary = props => {

  const { category } = props;

  const ref = useRef(null);
  const textRef = useRef(null);
  
  useEffect(() => {
    /**
     * Make sure clicking away works
     */

    window.addEventListener("click", clickOutside);
    return () => window.removeEventListener("click", clickOutside);
  })

  const [updateProjectCategory,] = useMutation(UPDATE_PROJECT_CATEGORY, {
    onError: () => {}
  });

  const [deleteProjectCategory,] = useMutation(DELETE_PROJECT_CATEGORY, {
    optimisticResponse: {
      __typename: "Mutation",
    },
    update: (proxy) => {
      const newData = cloneDeep(proxy.readQuery({ query: PROJECT_CATEGORIES }));
      newData.user.projectCategories = newData.user.projectCategories.filter(category_ => category.id !== category_.id)
      proxy.writeQuery({ query: PROJECT_CATEGORIES, data: newData })
    }
  });

  const clickOutside = e => {
    /**
     * Is the user indicating they are done editing the category?
     */

    if (!e || (ref.current && !ref.current.contains(e.target))) {
      if (textRef.current.innerText !== category.name) {
        updateProjectCategory({variables: {id: category.id, name: textRef.current.innerText}});
      } else {
        textRef.current.innerText = category.name;
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
    } else if (textRef.current.innerText.length >= 40 && e.key.length === 1 && !(e.ctrlKey ||  e.altKey || e.metaKey || e.shiftKey)) {
      e.preventDefault();
    }
  }

  return (
    <Draggable draggableId={category.id.toString()} index={category.order}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="project-category-summary">
          <div 
            className="category-name" contentEditable={true} onKeyDown={newNameTyping}
            suppressContentEditableWarning={true} ref={textRef}
          >{category.name}</div>
          <div
            className="delete"
            onClick={() => deleteProjectCategory({variables: {id: category.id}})}
          ><img src={cross} alt="delete"/></div>
          <div className="category-info">
            {category.projectCount} project{category.projectCount === 1 ? "" : "s"}
            {category.projectCount && ` (${category.activeProjectCount} active)`}
          </div>
        </div>
      )}
    </Draggable>
  );
};

ProjectCategorySummary.propTypes = {
  
};

export default ProjectCategorySummary;