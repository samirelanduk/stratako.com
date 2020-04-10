import gql from "graphql-tag";

export const ALL_GOALS_BY_CATEGORY = gql`{ user { goalCategories { edges {
  node { id name description goals { edges { node {
    id name description
  } } } }
} } } }`;

export const GOAL = gql`query goal($id: String!) { user { goal(id: $id) {
  id name description
} } }`