import React, { useEffect } from "react";
import Base from "./Base";

const ProjectsPage = () => {

  useEffect(() => {
    document.title = "stratako - Projects";
  });

  //const { loading, data } = useQuery(SLOTS);

  //if (loading) return <Base loading={true} />

  //const slots = data.user.slots;

  return (
    <Base className="projects-page">
     
    </Base>
  );
};

ProjectsPage.propTypes = {
  
};

export default ProjectsPage;