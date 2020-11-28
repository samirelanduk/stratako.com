import gql from "graphql-tag";

export const REORDER_OPERATION = gql`mutation reorderOperation(
  $slot: Int! $operation: ID! $index: Int!
) { reorderOperation(slot: $slot operation: $operation index: $index) {
  operations { edges { node { id slotOrder slot name description } } }
} }`;