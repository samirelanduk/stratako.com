import gql from "graphql-tag";

export const ALL_GOALS = gql`{ user { goals { edges { node {
  id name description
} } } } }`;

export const GOAL = gql`query goal($id: String!) { user { goal(id: $id) {
  id name description
} } }`