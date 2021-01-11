import gql from "graphql-tag";

export const USER_FIELDS = gql`
  fragment UserFields on UserType { 
    id email name
  }`;

export const USER = gql`{
  user { 
    ...UserFields
  }
} ${USER_FIELDS}`;

export const TOKEN = gql`{ accessToken }`;

export const SLOTS = gql`{ user { slots { id name order } } }`;