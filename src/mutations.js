import gql from "graphql-tag";

export const DELETE_GOAL_CATEGORY = gql`mutation($id: String!) {
  deleteGoalCategory(id: $id) { success }
}`;

export const UPDATE_GOAL = gql`mutation($id: String! $name: String $description: String) {
  updateGoal(id: $id, name: $name, description: $description) {
    goal { id name description }
  }
}`

export const MOVE_GOAL = gql`mutation($goal: String!, $index: Int!) {
  moveGoal(goal: $goal, index: $index) { goals { edges { node {
    id name description
  } } } }
}`;

export const MOVE_GOAL_BETWEEN_CATEGORIES = gql`mutation($goal: String!, $index: Int!, $category: String) {
  moveGoal(goal: $goal, index: $index, category: $category) { goalCategories { edges {
    node { id name description goals { edges { node {
      id name description
    } } } }
  } } }
}`;

export const DELETE_GOAL = gql`mutation($id: String!) {
  deleteGoal(id: $id) { success }
}`;