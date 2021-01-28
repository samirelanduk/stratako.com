import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { useMutation, useQuery } from "@apollo/client";
import classNames from "classnames";
import ProjectForm from "../components/ProjectForm";
import { PROJECT } from "../queries";
import { DELETE_PROJECT } from "../mutations";
import Base from "./Base";
import Modal from "../components/Modal";
import Button from "../components/Button";

const ProjectPage = () => {

  const projectId = useRouteMatch("/projects/:id").params.id;
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeletionModal, setShowDeletionModal] = useState(false);
  const { loading, data } = useQuery(PROJECT, {variables: {id: projectId}});
  const history = useHistory();
  
  useEffect(() => {
    document.title = data ? `stratako - ${project.name}` : "stratako";
  });

  const [deleteProject, deleteProjectMutation] = useMutation(DELETE_PROJECT, {
    onCompleted: () => history.push("/projects/")
  })

  if (loading) return <Base loading={true} />

  const project = data.user.project;

  const status = {
    1: "Active",
    2: "Maintenance",
    3: "On Hold",
    4: "Not Started",
    5: "Abandoned",
    6: "Completed"
  }[project.status]
  
  const statusClass = classNames({
    status: true, [status.toLowerCase().replace(" ", "-")]: true
  })

  const deleteSubmit = e => {
    e.preventDefault();
    deleteProject({variables: {id: project.id}})
  }

  return (
    <Base className="project-page">
      <div className="top-row">
        <h1>{project.name}</h1>
        <div className="options">
          <div className={statusClass}>{status}</div>
          <div className="option" onClick={() => setShowFormModal(true)}>Edit</div>
          <div className="option" onClick={() => setShowDeletionModal(true)}>Delete</div>
        </div>
      </div>
      
      <ProjectForm project={project} showFormModal={showFormModal} setShowFormModal={setShowFormModal}/>
      <Modal showModal={showDeletionModal} setShowModal={setShowDeletionModal}>
        <form onSubmit={deleteSubmit}>
          <div className="modal-heading">Delete Project {project.name}?</div>
          <p className="modal-text">This cannot be undone.</p>
          <Button className="delete-button" loading={deleteProjectMutation.loading}>Delete</Button>
        </form>
      </Modal>
      <p className="description">{project.description}</p>
    </Base>
  );
};

ProjectPage.propTypes = {
  
};

export default ProjectPage;