import React, { useContext } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import Toggle from "react-toggle";
import { UserContext } from "../contexts";
import { useMutation } from "@apollo/client";
import { UPDATE_PROJECT_SETTINGS } from "../mutations";

const ProjectsSettingsForm = () => {

  const [user, setUser] = useContext(UserContext);

  const groupByOptions = [
    {value: "none", label: "Don't Group"},
    {value: "status", label: "Project Status"},
    {value: "category", label: "Project Category"},
  ]

  const [updateProjectSettings,] = useMutation(
    UPDATE_PROJECT_SETTINGS
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
    </div>
  );
};

ProjectsSettingsForm.propTypes = {
  
};

export default ProjectsSettingsForm;