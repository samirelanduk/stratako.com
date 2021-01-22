import React, { useEffect } from "react";
import { useRouteMatch } from "react-router";
import { useQuery } from "@apollo/client";
import classNames from "classnames";
import { PROJECT } from "../queries";
import Base from "./Base";

const ProjectPage = () => {

  const projectId = useRouteMatch("/projects/:id").params.id;

  const { loading, data } = useQuery(PROJECT, {variables: {id: projectId}});
  
  useEffect(() => {
    document.title = data ? `stratako - ${project.name}` : "stratako";
  });

  if (loading) return <Base loading={true} />

  const project = data.user.project;

  const status = {
    1: "Not Started",
    2: "Active",
    3: "Maintenance",
    4: "Abandoned",
    5: "Completed"
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
      <p className="description">{project.description}</p>
    </Base>
  );
};

ProjectPage.propTypes = {
  
};

export default ProjectPage;