import gql from "graphql-tag";

export const OPERATION = gql`query operation($id: ID!) { operation(id: $id) {
  id name description started completed tasks { id name completed }
} }`;

export const CURRENT_OPERATIONS = gql`{
  slots { id name operation {
    id name started projects { id name } tasks { id name completed }
  } }
}`;

export const FUTURE_OPERATIONS = gql`{ slots {
  id name
  operation { id }
  operations(started: false) {
    id name description slotOrder projects { id name }
  }
} }`;

export const PAST_OPERATIONS = gql`{ slots {
  id name
  operations(completed: true) {
    id name description slotOrder started completed projects { id name }
  }
} }`;

export const PROJECT = gql`query project($id: ID!) { project(id: $id) {
  id name description
} }`;

export const PROJECTS = gql`{ projects {
  id name description
} }`;