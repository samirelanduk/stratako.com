import gql from "graphql-tag";

export const USER = gql`{ user { email firstName lastName }}`;