import gql from "graphql-tag";

export const CURRENT_OPERATIONS = gql`{
  operations(started: true, completed: false) {
    edges { node { id name description slot } }
  }
}`;

export const FUTURE_OPERATIONS = gql`{
  operations(started: false) {
    edges { node { id name description slot slotOrder } }
  }
}`;