import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import moment from "moment";
import TaskList from "./TaskList";
import ProjectsList from "./ProjectsList";
import { CURRENT_OPERATIONS, FUTURE_OPERATIONS, PROJECTS } from "../queries";
import { COMPLETE_OPERATION, ACTIVATE_OPERATION, REORDER_OPERATIONS } from "../mutations";
import checkedIcon from "../images/checked.svg";

const Operation = props => {

  const { operation, canActivate, canMoveUp, canMoveDown, index, slot } = props;

  const [completeOperation,] = useMutation(COMPLETE_OPERATION, {
    refetchQueries: [{query: CURRENT_OPERATIONS}, {query: PROJECTS}]
  });

  const [activateOperation,] = useMutation(ACTIVATE_OPERATION, {
    refetchQueries: [{query: FUTURE_OPERATIONS}, {query: PROJECTS}],
  });

  const [reorderOperation,] = useMutation(REORDER_OPERATIONS, {

  });

  const reorder = (slotId, operationId, index) => {
    reorderOperation({
      variables: {slot: slotId, index, operation: operationId}
    });
  }

  return (
    <div className="operation">
      <div className="top-row">
        <div className="main-info">

          {operation.completed ? (
            <img src={checkedIcon} alt="checked" className="action" />
          ) : operation.started ? (
            <button
              className="action"
              onClick={() => completeOperation({variables: {id: operation.id}})}
            />
          ): (
            <button
              className={`action activate ${canActivate ? "" : "disabled"}`}
              onClick={() => activateOperation({variables: {id: operation.id}})}
            />
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

      {!operation.completed && !operation.started && <div className="order-buttons">
        {canMoveUp ? (
          <div
            className="move-up"
            onClick={() => reorder(slot.id, operation.id, index - 1)}
          />
        ) : <div className="order-spacer" />}

        {canMoveDown ? (
          <div
            className="move-down"
            onClick={() => reorder(slot.id, operation.id, index + 1)}
          />
        ) : <div className="order-spacer" />}
      </div>}

      {operation.tasks && <TaskList tasks={operation.tasks} operation={operation} />}
      
    </div>
  );
};

Operation.propTypes = {
  
};

export default Operation;