import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import moment from "moment";
import Base from "./Base";
import Project from "../components/Project";
import { PROJECTS } from "../queries";

const ProjectsPage = props => {

  const { loading, data } = useQuery(PROJECTS);

  if (loading) return <Base className="projects-page" loading={true} />

  const projects = [...data.projects].sort((p1, p2) => {
    const d1 = p1.lastActivity === null ? 0 : moment(p1.lastActivity).valueOf();
    const d2 = p2.lastActivity === null ? 0 : moment(p2.lastActivity).valueOf();
    return d2 - d1;
  })

  return (
    <Base className="projects-page">
      {projects.map(project => <Project project={project} key={project.id} />)}
    </Base>
  );
};

ProjectsPage.propTypes = {
  
};

export default ProjectsPage;