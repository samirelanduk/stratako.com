import React, { useEffect, useState } from "react";
import Base from "./Base";
import Modal from "../components/Modal";
import ProjectForm from "../components/ProjectForm";
import { PROJECTS } from "../queries";
import { useQuery } from "@apollo/client";
import Project from "../components/Project";

const ProjectsPage = () => {

  useEffect(() => {
    document.title = "stratako - Projects";
  });

  const [showModal, setShowModal] = useState(false);

  const { loading, data } = useQuery(PROJECTS);

  if (loading) return <Base loading={true} />

  const projects = data.user.projects;

  return (
    <Base className="projects-page">
      <div className="projects-panel">
        <button className="new-project" onClick={() => setShowModal(true)}>+ New Project</button>
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <ProjectForm />
        </Modal>
      </div>

      <div className="projects">
        <h2>All Projects ({projects.length})</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <Project key={project.id} project={project} />
          ))}
        </div>
      </div>
    </Base>
  );
};

ProjectsPage.propTypes = {
  
};

export default ProjectsPage;