import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Base from "./Base";
import { PROJECTS } from "../queries";

const ProjectsPage = props => {

  const { loading, data } = useQuery(PROJECTS);

  if (loading) {
    return (
      <Base className="projects-page">
        loading
      </Base>
    );
  }

  const projects = data.projects.edges.map(edge => edge.node);

  return (
    <Base className="projects-page">
      {projects.map(project => (
        <div className="project">
          <h2><Link to={`/projects/${project.id}/`}>{project.name}</Link></h2>
          <p>{project.description}</p>
        </div>
      ))}
    </Base>
  );
};

ProjectsPage.propTypes = {
  
};

export default ProjectsPage;