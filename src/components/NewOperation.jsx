import React, { useState } from "react";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import { useApolloClient, useMutation } from "@apollo/client";
import { CREATE_OPERATION } from "../mutations";
import { FUTURE_OPERATIONS, PROJECT } from "../queries";

const NewOperation = props => {

  const { project, slot } = props;
  const [name, setName] = useState("");
  const client = useApolloClient();

  const [createOperation, createOperationMutation] = useMutation(CREATE_OPERATION, {
    onCompleted: data => {
      if (project) {
        const newData = cloneDeep(client.cache.readQuery({ query: PROJECT, variables: {id: project.id}}));
        for (let operation of newData.user.project.operations) {
          if (operation.id === "-1") {
            operation.id = data.createOperation.operation.id
          }
        }
        client.cache.writeQuery({query: PROJECT, variables: {id: project.id}, data: newData});
      }
      const newData = cloneDeep(client.cache.readQuery({query: FUTURE_OPERATIONS}));
      if (slot && newData) {
        for (let dataSlot of newData.user.slots) {
          if (slot.id === dataSlot.id) {
            for (let operation of dataSlot.futureOperations) {
              if (operation.id === "-1") {
                operation.id = data.createOperation.operation.id
              }
            }
          }
        }
      } else if (newData) {
        for (let operation of newData.user.operationsWithoutSlots) {
          if (operation.id === "-1") {
            operation.id = data.createOperation.operation.id
          }
        }
      }
      client.cache.writeQuery({ query: FUTURE_OPERATIONS, data: newData });
      setName("")
    },
    update: (proxy) => {
      if (project) {
        const newData = cloneDeep(proxy.readQuery({ query: PROJECT, variables: {id: project.id}}));
        newData.user.project.operations.push({
          id: "-1", name, projectOrder: newData.user.project.operations.filter(o => !o.started).length + 1,
          projects: [project], started: null, completed: null, __typename: "OperationType", description: ""
        })
        proxy.writeQuery({ query: PROJECT, variables: {id: project.id}, data: newData });      
      } else {
        const newData = cloneDeep(proxy.readQuery({query: FUTURE_OPERATIONS}));
        if (slot && newData) {
          for (let dataSlot of newData.user.slots) {
            if (slot.id === dataSlot.id) {
              dataSlot.futureOperations.push({
                id: "-1", name, order: dataSlot.futureOperations.length + 1,
                projects: [], started: null, completed: null, __typename: "OperationType",
                description: ""
              })
            }
          }
        } else if (newData) {
          newData.user.operationsWithoutSlots.push({
            id: "-1", name, order: newData.user.operationsWithoutSlots.length + 1,
            projects: [], started: null, completed: null, __typename: "OperationType",
            description: ""
          })
        }
        proxy.writeQuery({ query: FUTURE_OPERATIONS, data: newData });
      }
    },
  })

  const formSubmit = e => {
    e.preventDefault();
    createOperation({variables: {
      name, project: project ? project.id : null, slot: slot ? slot.id : null
    }})
  }

  return (
    <form className="new-operation" onSubmit={formSubmit}>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        required
        disabled={createOperationMutation.loading}
      />
    </form>
  );
};

NewOperation.propTypes = {
  project: PropTypes.object,
  slot: PropTypes.object,
};

export default NewOperation;