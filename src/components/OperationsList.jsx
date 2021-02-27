import React, { useState } from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import Operation from "./Operation";

const OperationsList = props => {

  const { operations, droppableId } = props;

  const [expanded, setExpanded] = useState(null);

  return (
    <Droppable droppableId={droppableId}>
      {provided => (
        <div className="operations-list" ref={provided.innerRef} {...provided.droppableProps}>
          {operations.map((operation, i) => (
            <React.Fragment key={i}>
              <Operation
                operation={operation}
                expanded={expanded === i}
                expand={() => setExpanded(i)}
                close={() => setExpanded(null)}
                draggable={true}
              />
              {expanded === i && (
                <Operation
                  operation={operation}
                  expanded={false}
                  expand={() => setExpanded(i)}
                  close={() => setExpanded(null)}
                  draggable={false}
                />
              )}
            </React.Fragment>
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