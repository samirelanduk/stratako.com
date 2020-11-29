import gql from "graphql-tag";

export const OPERATION = gql`query operation($id: ID!) { operation(id: $id) {
  id name description started completed
} }`

export const CURRENT_OPERATIONS = gql`{
  slots { id name operation { id name started projects { id name } } }
}`;

export const FUTURE_OPERATIONS = gql`{
  slots { id name operation { id } operations(started: false) {
    edges { node { id name description slotOrder projects { id name } } }
  } }
}`;

export const PAST_OPERATIONS = gql`{
  slots { id name operations(completed: true) { edges { node {
    id name description slotOrder started completed projects { id name }
  } } } }
}`;