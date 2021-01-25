import gql from "graphql-tag";

export const USER_FIELDS = gql`
  fragment UserFields on UserType { 
    id email name defaultProjectGrouping showDoneProjects
  }`;

export const USER = gql`{
  user { 
    ...UserFields
  }
} ${USER_FIELDS}`;

export const TOKEN = gql`{ accessToken }`;

export const SLOTS = gql`{ user { slots { id name order } } }`;

export const PROJECTS = gql`{ user { projects {
  id name color status creationTime 
} } }`;

export const PROJECT = gql`query project($id: ID!) {
  user { project(id: $id) { id name description status creationTime } }
}`;