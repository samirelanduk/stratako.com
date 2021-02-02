import gql from "graphql-tag";
import { USER_FIELDS } from "./queries";

export const LOGIN = gql`mutation login($email: String! $password: String!) {
  login(email: $email password: $password) { accessToken user {
    ...UserFields
  } }
} ${USER_FIELDS}`;

export const LOGOUT = gql`mutation { logout { success } }`;

export const SIGNUP = gql`mutation login(
  $email: String! $password: String! $name: String!
) { signup(
  email: $email password: $password name: $name
) { accessToken user { 
  ...UserFields
 } }
} ${USER_FIELDS}`;

export const UPDATE_USER = gql`mutation updateUser(
  $email: String! $name: String!
) { updateUser(email: $email name: $name) {
  user { 
    ...UserFields
   }
} } ${USER_FIELDS}`;

export const UPDATE_PASSWORD = gql`mutation updateUser(
  $new: String! $current: String!
) { updatePassword(new: $new current: $current) {
  success
} }`;

export const UPDATE_PROJECT_SETTINGS = gql`mutation updateProjectSettings(
  $defaultProjectGrouping: String! $showDoneProjects: Boolean
) { updateProjectSettings(
  defaultProjectGrouping: $defaultProjectGrouping showDoneProjects: $showDoneProjects
) { user { 
  ...UserFields
} } } ${USER_FIELDS}`;

export const DELETE_USER = gql`mutation { deleteUser { success } }`;

export const CREATE_SLOT = gql`mutation createSlot($name: String!) {
  createSlot(name: $name) { slot { id name order } }
}`;

export const UPDATE_SLOT = gql`mutation updateSlot($id: ID! $name: String!) {
  updateSlot(id: $id name: $name) { slot { id name order } }
}`;

export const MOVE_SLOT = gql`mutation moveSlot($id: ID! $index: Int!) {
  moveSlot(id: $id index: $index) { slot { id name order } }
}`;

export const DELETE_SLOT = gql`mutation updateSlot($id: ID!) {
  deleteSlot(id: $id) { success }
}`;

export const CREATE_PROJECT = gql`mutation createProject(
  $name: String! $description: String! $status: Int! $color: String! $category: String
) {
  createProject(name: $name description: $description status: $status color: $color category: $category) {
    project { id }
  }
}`;

export const UPDATE_PROJECT = gql`mutation updateProject(
  $id: ID! $name: String! $description: String! $status: Int! $color: String! $category: String
) {
  updateProject(id: $id name: $name description: $description status: $status color: $color category: $category) {
    project { id }
  }
}`;

export const DELETE_PROJECT = gql`mutation deleteProject($id: ID!) {
  deleteProject(id: $id) { success }
}`;