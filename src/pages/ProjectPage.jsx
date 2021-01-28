import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { useQuery } from "@apollo/client";
import classNames from "classnames";
import ProjectForm from "../components/ProjectForm";
import { PROJECT } from "../queries";
import Base from "./Base";

const ProjectPage = () => {

  const projectId = useRouteMatch("/projects/:id").params.id;
  const [showFormModal, setShowFormModal] = useState(false);
  const { loading, data } = useQuery(PROJECT, {variables: {id: projectId}});
  
  useEffect(() => {
    document.title = data ? `stratako - ${project.name}` : "stratako";
  });

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

  return (
    <Base className="project-page">
      <div className="top-row">
        <h1>{project.name}</h1>
        <div className={statusClass}>{status}</div>
      </div>
      <div onClick={() => setShowFormModal(true)}>Edit</div>
      <ProjectForm project={project} showFormModal={showFormModal} setShowFormModal={setShowFormModal}/>
      <p className="description">{project.description}</p>
    </Base>
  );
};

ProjectPage.propTypes = {
  
};

export default ProjectPage;