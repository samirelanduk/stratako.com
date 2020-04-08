import gql from "graphql-tag";

export const ALL_GOALS = gql`{ user { goals { edges { node {
  id name description
} } } } }`;