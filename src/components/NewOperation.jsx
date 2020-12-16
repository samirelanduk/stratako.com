import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { CREATE_OPERATION } from "../mutations";
import { FUTURE_OPERATIONS } from "../queries";

const NewOperation = props => {

  const { slot } = props;
  const [name, setName] = useState("");

  const [createOperation,] = useMutation(CREATE_OPERATION, {
    refetchQueries: [{query: FUTURE_OPERATIONS}],
    onCompleted: () => setName("")
  })

  const formSubmit= e => {
    e.preventDefault();
    createOperation({
      variables: {name, slot: slot.id}
    })

  }
  return (
    <form className="operation new-operation" onSubmit={formSubmit}>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </form>
  );
};

NewOperation.propTypes = {
  
};

export default NewOperation;