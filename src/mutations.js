import gql from "graphql-tag";

export const COMPLETE_OPERATION = gql`mutation complete($id: ID!) {
  completeOperation(id: $id) { operation { id } }
}`;

export const REORDER_OPERATIONS = gql`mutation reorderOperations(
  $slot: ID! $operation: ID! $index: Int!
) { reorderOperations(slot: $slot operation: $operation index: $index) { slot {
  id order name operations(started: false) { edges { node { id slotOrder name description } } }
} } }`;