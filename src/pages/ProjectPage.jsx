import React from "react";
import { useRouteMatch } from "react-router";
import { useQuery, useMutation } from "@apollo/client";
import Base from "./Base";
import ProjectOperations from "../components/ProjectOperations";
import { PROJECT } from "../queries";

const ProjectPage = () => {

  const projectId = useRouteMatch("/projects/:id").params.id;

  const { loading, data } = useQuery(PROJECT, {
    variables: { id: projectId}
  });

  if (loading) return <Base className="project-page" loading={true} />

  const project = data.project;

  return (
    <Base className="project-page">
      <h1>{project.name}</h1>
      <p>{project.description}</p>

      <ProjectOperations project={project} />
    </Base>
  );
};

ProjectPage.propTypes = {
  
};

export default ProjectPage;