import React, { useState } from "react";
import { useHistory } from "react-router";
import { useMutation } from "@apollo/client";
import Select from "react-select";
import { TwitterPicker } from "react-color";
import { CREATE_PROJECT } from "../mutations";
import Button from "./Button";
import { createErrorObject } from "../forms";

const ProjectForm = () => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#111111");
  const [status, setStatus] = useState(1);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const statuses = [
    {value: 1, label: "Not Started"}, {value: 2, label: "Active"},
    {value: 3, label: "Maintenance"}, {value: 4, label: "Completed"},
    {value: 5, label: "Abandoned"}
  ]

  const colors = [
    "#00a8ff", "#8c7ae6", "#e84118", "#e1b12c", "#718093", "#44bd32", "#2f3640",
    "#ff9ff3", "#ff9f43", "#48dbfb", "#b71540", "#b8e994", "#fff200", "#d1ccc0"
  ]

  const [createForm, createFormMutation] = useMutation(CREATE_PROJECT, {
    onCompleted: data => history.push(`/projects/${data.createProject.project.id}/`),
    onError: ({graphQLErrors}) => {
      setErrors(createErrorObject(errors, graphQLErrors))
    }
  });

  const formSubmit = e => {
    e.preventDefault();
    createForm({variables: {name, description, color, status}});
  }

  return (
    <form className="project-form" onSubmit={formSubmit}>
      <div className="input">
        <label htmlFor="name">What is the Project called?</label>
        {errors.name && <div className="error">{errors.name}</div>}
        <input
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>

      <div className="input">
        <label htmlFor="description">Describe the project. What is its aim? What are its completion conditions?</label>
        <textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="bottom-row">
        <div className="input">
          <label>What is its initial status?</label>
          <Select
            options={statuses}
            value={statuses.filter(s => s.value === status)[0]}
            onChange={e => setStatus(e.value)}
            className="status"
            classNamePrefix="status"
          />
        </div>
        <div className="input">
          <label htmlFor="color">What color should it use? <span style={{backgroundColor: color}} /></label>
          <TwitterPicker
            color={color} onChange={c => setColor(c.hex)} triangle="hide"
            colors={colors} width={`324px`}
          />
        </div>
      </div>
      <Button loading={createFormMutation.loading}>Create Project</Button>
    </form>
  );
};

ProjectForm.propTypes = {
  
};

export default ProjectForm;