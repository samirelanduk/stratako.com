import gql from "graphql-tag";

export const DELETE_GOAL = gql`mutation($id: String!) {
  deleteGoal(id: $id) { success }
}`;