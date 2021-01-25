import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Base from "./Base";
import Modal from "../components/Modal";
import ProjectForm from "../components/ProjectForm";
import { PROJECTS } from "../queries";
import Project from "../components/Project";
import Select from "react-select";
import { UserContext } from "../contexts";

const ProjectsPage = () => {

  useEffect(() => {
    document.title = "stratako - Projects";
  });

  const [showModal, setShowModal] = useState(false);
  const [groupBy, setGroupBy] = useState();
  const [user,] = useContext(UserContext);
  const actualGroupBy = groupBy || user.defaultProjectGrouping;

  const { loading, data } = useQuery(PROJECTS);

  if (loading) return <Base loading={true} />

  const projects = data.user.projects.filter(
    project => project.status < 5 || user.showDoneProjects
  );

  const groupByOptions = [
    {value: "none", label: "Don't Group"},
    {value: "status", label: "Project Status"},
  ]

  let projectLists = [["All Projects", projects]];
  if (actualGroupBy === "status") {
    projectLists =  Object.entries({
      1: "Active", 2: "Maintenance", 3: "On Hold", 4: "Not Started",
      ...(user.showDoneProjects ? {5: "Abandoned", 6: "Completed"} : {})
    }).map(([num, label]) => [
      label, projects.filter(p => p.status === parseInt(num))
    ]);
  }

  return (
    <Base className="projects-page">
      <div className="projects-panel">
        <div className="option">
          <label>Group Projects by:</label>
          <Select 
            options={groupByOptions}
            value={groupByOptions.filter(o => o.value === actualGroupBy)[0]}
            onChange={e => setGroupBy(e.value)}
            className="select" classNamePrefix="select"
          />
        </div>

        <button className="new-project" onClick={() => setShowModal(true)}>+ New Project</button>
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <ProjectForm />
        </Modal>
      </div>

      <div className="projects">
        {projectLists.map(([label, projects]) => (
          <React.Fragment key={label}>
            <h2>{label} ({projects.length})</h2>
            <div className="projects-grid">
              {projects.map(project => (
                <Project key={project.id} project={project} />
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </Base>
  );
};

ProjectsPage.propTypes = {
  
};

export default ProjectsPage;