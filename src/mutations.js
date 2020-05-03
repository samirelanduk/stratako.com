import gql from "graphql-tag";

export const DELETE_GOAL_CATEGORY = gql`mutation($id: String!) {
  deleteGoalCategory(id: $id) { success }
}`;

export const MOVE_GOAL = gql`mutation($goal: String!, $index: Int!) {
  moveGoal(goal: $goal, index: $index) { goals { edges { node {
    id name description
  } } } }
}`;

export const DELETE_GOAL = gql`mutation($id: String!) {
  deleteGoal(id: $id) { success }
}`;