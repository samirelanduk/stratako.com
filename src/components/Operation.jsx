import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import TaskList from "./TaskList";
import ProjectsList from "./ProjectsList";

const Operation = props => {

  const { operation } = props;

  return (
    <div className="operation">
      <div className="top-row">
        <div className="main-info">
          <button className="action" />
          <div className="operation-name">{operation.name}</div>
        </div>
        {operation.projects && <ProjectsList projects={operation.projects} />}
      </div>


      {operation.started && !operation.completed && (
        <div className="started">Started: {moment(operation.started).format("DD-MMM")}</div>
      )}

      {operation.tasks && <TaskList tasks={operation.tasks} operation={operation} />}
      
    </div>
  );
};

Operation.propTypes = {
  
};

export default Operation;