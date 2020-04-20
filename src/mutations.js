import gql from "graphql-tag";

export const DELETE_GOAL_CATEGORY = gql`mutation($id: String!) {
  deleteGoalCategory(id: $id) { success }
}`;

export const DELETE_GOAL = gql`mutation($id: String!) {
  deleteGoal(id: $id) { success }
}`;