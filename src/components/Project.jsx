import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";

const Project = props => {

  const { project } = props;

  const activityDate = moment(project.lastActivity);
  const today = moment();
  const days = today.diff(activityDate, "days");
  const dayString = project.lastActivity ? (
    `${days} day${days === 1 ? "" : "s"} ${days < 0 ? "from now" : "ago"}`
  ) : "-";

  return (
    <Link to={`/projects/${project.id}/`} className="project" style={{borderRightColor: project.color}}>
      <div className="project-name">{project.name}</div>
      <div className="last-activity">{dayString}</div>
    </Link>
  );
};

Project.propTypes = {
  
};

export default Project;