import gql from "graphql-tag";

export const CURRENT_OPERATIONS = gql`{
  slots { id name operation { id name started } }
}`;

export const FUTURE_OPERATIONS = gql`{
  slots { id name operation { id } operations(started: false) {
    edges { node { id name description slotOrder } }
  } }
}`;

export const PAST_OPERATIONS = gql`{
  slots { id name operations(completed: true) {
    edges { node { id name description slotOrder started completed } }
  } }
}`;