import gql from "graphql-tag";

export const SIGNUP = gql`mutation(
  $firstName: String! $lastName: String! $email: String! $password: String!
) { 
  signup(
    firstName: $firstName, lastName: $lastName
    email: $email, password: $password
  ) {
    token user { email }
  }
}`;

export const LOGIN = gql`mutation($email: String! $password: String!) { 
  login(email: $email, password: $password) {
    token user { email }
  }
}`;