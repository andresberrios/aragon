import gql from "graphql-tag";

export const GET_PROCEDURES = gql`
  query {
    procedures {
      id
      name
      description
      steps
      createdAt
      updatedAt
    }
  }
`;

export const GET_PROCEDURE = gql`
  query($id: uuid!) {
    procedure: procedures_by_pk(id: $id) {
      id
      name
      description
      steps
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_PROCEDURE = gql`
  mutation($name: Procedure!) {
    insert_procedure(objects: $procedure) {
      returning {
        id
        name
        description
        steps
        createdAt
        updatedAt
      }
    }
  }
`;
