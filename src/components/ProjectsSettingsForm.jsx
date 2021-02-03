import React, { useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Select from "react-select";
import Toggle from "react-toggle";
import { MoonLoader } from "react-spinners";
import { cloneDeep } from "lodash";
import { UserContext } from "../contexts";
import { MOVE_PROJECT_CATEGORY, UPDATE_PROJECT_SETTINGS } from "../mutations";
import { PROJECT_CATEGORIES } from "../queries";
import ProjectCategorySummary from "./ProjectCategorySummary";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const ProjectsSettingsForm = () => {

  const [user, setUser] = useContext(UserContext);

  const { loading, data } = useQuery(PROJECT_CATEGORIES);

  const groupByOptions = [
    {value: "none", label: "Don't Group"},
    {value: "status", label: "Project Status"},
    {value: "category", label: "Project Category"},
  ]

  const [updateProjectSettings,] = useMutation(
    UPDATE_PROJECT_SETTINGS
  )

  const [moveProjectCategory,] = useMutation(MOVE_PROJECT_CATEGORY, {
    optimisticResponse: {__typename: "Mutation"},
  });

  if (loading) return (
    <div className="project-settings-form loading"><MoonLoader color="#01a3a4" /></div>
  )

  const groupChanged = e => {
    setUser({...user, defaultProjectGrouping: e.value})
    updateProjectSettings({variables: {
      defaultProjectGrouping: e.value, showDoneProjects: user.showDoneProjects
    }})
  }

  const doneChanged = e => {
    setUser({...user, showDoneProjects: e.target.checked})
  }

  const categories = data.user.projectCategories;

  const onDragEnd = e => {
    moveProjectCategory({
      variables: {id: e.draggableId, index: e.destination.index - 1},
      update: (proxy) => {
        const newData = cloneDeep(proxy.readQuery({ query: PROJECT_CATEGORIES }));
        const matchingCategories = newData.user.projectCategories.filter(s => s.id === e.draggableId);
        if (matchingCategories.length) {
          const category = matchingCategories[0];
          newData.user.projectCategories = newData.user.projectCategories.filter(s => s.id !== e.draggableId);
          newData.user.projectCategories.splice(e.destination.index - 1, 0, category);
          newData.user.projectCategories = newData.user.projectCategories.map((s, i) => ({...s, order: i + 1}));
        }
        proxy.writeQuery({ query: PROJECT_CATEGORIES, data: newData })
      },
    })
  }

  return (
    <div className="project-settings-form">
      <div className="option">
        <label>Default Project Grouping:</label>
        <Select 
          options={groupByOptions}
          value={groupByOptions.filter(o => o.value === user.defaultProjectGrouping)[0]}
          onChange={groupChanged}
          className="select" classNamePrefix="select"
        />
      </div>

      <div className="option">
        <label>Show Abandoned/Completed Projects:</label>
        <Toggle
          checked={user.showDoneProjects}
          onChange={doneChanged}
          icons={false}
        />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="category-count">You have {categories.length} project categor{categories.length === 1 ? "y" : "ies"}:</div>
        <Droppable droppableId="1">
          {provided => (
            <div className="categories-grid" ref={provided.innerRef} {...provided.droppableProps}>
              {categories.map(category => (
                <ProjectCategorySummary category={category} key={category.id} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

ProjectsSettingsForm.propTypes = {
  
};

export default ProjectsSettingsForm;