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

export const DELETE_USER = gql`mutation { deleteUser { success } }`;

export const CREATE_SLOT = gql`mutation createSlot($name: String!) {
  createSlot(name: $name) { slot { id name order } }
}`;