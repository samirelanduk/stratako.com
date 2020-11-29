import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import moment from "moment";
import TaskList from "./TaskList";
import ProjectsList from "./ProjectsList";
import { CURRENT_OPERATIONS } from "../queries";
import { COMPLETE_OPERATION } from "../mutations";
import checked from "../images/checked.svg";

const Operation = props => {

  const { operation } = props;

  const [completeOperation,] = useMutation(COMPLETE_OPERATION, {
    refetchQueries: [{query: CURRENT_OPERATIONS}]
  });

  return (
    <div className="operation">
      <div className="top-row">
        <div className="main-info">
          {operation.completed ? <img src={checked} alt="checked" className="action" /> : (
            <button className="action" onClick={() => completeOperation({variables: {id: operation.id}})} />
          )}
          <Link className="operation-name" to={`/operations/${operation.id}/`}>{operation.name}</Link>
        </div>
        {operation.projects && <ProjectsList projects={operation.projects} />}
      </div>


      {operation.started && !operation.completed && (
        <div className="started">Started: {moment(operation.started).format("D MMM")}</div>
      )}
      {operation.started && operation.completed && (
        <div className="started">
          {moment(operation.started).format("D MMM")} to {moment(operation.completed).format("D MMM")}</div>
      )}

      {operation.tasks && <TaskList tasks={operation.tasks} operation={operation} />}
      
    </div>
  );
};

Operation.propTypes = {
  
};

export default Operation;