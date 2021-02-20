import React from "react";
import PropTypes from "prop-types";
import Operation from "./Operation";

const OperationsList = props => {

  const { operations } = props;

  return (
    <div className="operations-list">
      {operations.map(operation => (
        <Operation operation={operation} key={operation.id} />
      ))}
    </div>
  );
};

OperationsList.propTypes = {
  operations: PropTypes.array.isRequired
};

export default OperationsList;