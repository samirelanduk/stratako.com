import React from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import Operation from "./Operation";

const OperationsList = props => {

  const { operations, droppableId } = props;

  return (
    <Droppable droppableId={droppableId}>
      {provided => (
        <div className="operations-list" ref={provided.innerRef} {...provided.droppableProps}>
          {operations.map(operation => (
            <Operation operation={operation} key={operation.id} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

OperationsList.propTypes = {
  operations: PropTypes.array.isRequired
};

export default OperationsList;