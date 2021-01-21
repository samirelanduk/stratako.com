import React, { useEffect, useState } from "react";
import Base from "./Base";
import Modal from "../components/Modal";
import ProjectForm from "../components/ProjectForm";

const ProjectsPage = () => {

  useEffect(() => {
    document.title = "stratako - Projects";
  });

  const [showModal, setShowModal] = useState(false);

  //const { loading, data } = useQuery(SLOTS);

  //if (loading) return <Base loading={true} />

  //const slots = data.user.slots;

  return (
    <Base className="projects-page">
      <div className="projects-panel">
        <button className="new-project" onClick={() => setShowModal(true)}>+ New Project</button>
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <ProjectForm />
        </Modal>
      </div>
    </Base>
  );
};

ProjectsPage.propTypes = {
  
};

export default ProjectsPage;